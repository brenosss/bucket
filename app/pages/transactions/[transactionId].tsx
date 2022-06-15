import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import AuthenticatedLayout from "app/core/layouts/AuthenticatedLayout"
import getTransaction from "app/transactions/queries/getTransaction"
import deleteTransaction from "app/transactions/mutations/deleteTransaction"

export const Transaction = () => {
  const router = useRouter()
  const transactionId = useParam("transactionId", "number")
  const [deleteTransactionMutation] = useMutation(deleteTransaction)
  const [transaction] = useQuery(getTransaction, { id: transactionId })

  return (
    <>
      <Head>
        <title>Transaction {transaction.id}</title>
      </Head>

      <div>
        <h1>Transaction {transaction.id}</h1>
        <pre>{JSON.stringify(transaction, null, 2)}</pre>

        <Link href={Routes.EditTransactionPage({ transactionId: transaction.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTransactionMutation({ id: transaction.id })
              router.push(Routes.TransactionsPage())
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

const ShowTransactionPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TransactionsPage()}>
          <a>Transactions</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Transaction />
      </Suspense>
    </div>
  )
}

ShowTransactionPage.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default ShowTransactionPage
