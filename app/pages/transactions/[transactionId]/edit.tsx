import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import AuthenticatedLayout from "app/core/layouts/AuthenticatedLayout"
import getTransaction from "app/transactions/queries/getTransaction"
import updateTransaction from "app/transactions/mutations/updateTransaction"
import { TransactionForm, FORM_ERROR } from "app/transactions/components/TransactionForm"

export const EditTransaction = () => {
  const router = useRouter()
  const transactionId = useParam("transactionId", "number")
  const [transaction, { setQueryData }] = useQuery(
    getTransaction,
    { id: transactionId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateTransactionMutation] = useMutation(updateTransaction)

  return (
    <>
      <Head>
        <title>Edit Transaction {transaction.id}</title>
      </Head>

      <div>
        <h1>Edit Transaction {transaction.id}</h1>
        <pre>{JSON.stringify(transaction, null, 2)}</pre>

        <TransactionForm
          submitText="Update Transaction"
          onSubmit={async (values) => {
            try {
              const updated = await updateTransactionMutation({
                id: transaction.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowTransactionPage({ transactionId: updated.id }))
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

const EditTransactionPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTransaction />
      </Suspense>

      <p>
        <Link href={Routes.TransactionsPage()}>
          <a>Transactions</a>
        </Link>
      </p>
    </div>
  )
}

EditTransactionPage.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default EditTransactionPage
