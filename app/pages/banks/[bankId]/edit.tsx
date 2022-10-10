import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBank from "app/banks/queries/getBank"
import updateBank from "app/banks/mutations/updateBank"
import { BankForm, FORM_ERROR } from "app/banks/components/BankForm"

export const EditBank = () => {
  const router = useRouter()
  const bankId = useParam("bankId", "number")
  const [bank, { setQueryData }] = useQuery(
    getBank,
    { id: bankId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateBankMutation] = useMutation(updateBank)

  return (
    <>
      <Head>
        <title>Edit Bank {bank.id}</title>
      </Head>

      <div>
        <h1>Edit Bank {bank.id}</h1>
        <pre>{JSON.stringify(bank, null, 2)}</pre>

        <BankForm
          submitText="Update Bank"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateBank}
          initialValues={bank}
          onSubmit={async (values) => {
            try {
              const updated = await updateBankMutation({
                id: bank.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowBankPage({ bankId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditBankPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditBank />
      </Suspense>

      <p>
        <Link href={Routes.BanksPage()}>
          <a>Banks</a>
        </Link>
      </p>
    </div>
  )
}

EditBankPage.authenticate = true
EditBankPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditBankPage
