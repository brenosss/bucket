import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBank from "app/banks/queries/getBank"
import deleteBank from "app/banks/mutations/deleteBank"

export const Bank = () => {
  const router = useRouter()
  const bankId = useParam("bankId", "number")
  const [deleteBankMutation] = useMutation(deleteBank)
  const [bank] = useQuery(getBank, { id: bankId })

  return (
    <>
      <Head>
        <title>Bank {bank.id}</title>
      </Head>

      <div>
        <h1>Bank {bank.id}</h1>
        <pre>{JSON.stringify(bank, null, 2)}</pre>

        <Link href={Routes.EditBankPage({ bankId: bank.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteBankMutation({ id: bank.id })
              router.push(Routes.BanksPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowBankPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.BanksPage()}>
          <a>Banks</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Bank />
      </Suspense>
    </div>
  )
}

ShowBankPage.authenticate = true
ShowBankPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowBankPage
