import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createBank from "app/banks/mutations/createBank"
import { BankForm, FORM_ERROR } from "app/banks/components/BankForm"

const NewBankPage: BlitzPage = () => {
  const router = useRouter()
  const [createBankMutation] = useMutation(createBank)

  return (
    <div>
      <h1>Create New Bank</h1>

      <BankForm
        submitText="Create Bank"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateBank}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const bank = await createBankMutation(values)
            router.push(Routes.ShowBankPage({ bankId: bank.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.BanksPage()}>
          <a>Banks</a>
        </Link>
      </p>
    </div>
  )
}

NewBankPage.authenticate = true
NewBankPage.getLayout = (page) => <Layout title={"Create New Bank"}>{page}</Layout>

export default NewBankPage
