import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import AuthenticatedLayout from "app/core/layouts/AuthenticatedLayout"
import createTransaction from "app/transactions/mutations/createTransaction"
import { TransactionForm, FORM_ERROR } from "app/transactions/components/TransactionForm"
import Container from "app/core/components/Container"

const NewTransactionPage: BlitzPage = () => {
  const router = useRouter()
  const [createTransactionMutation] = useMutation(createTransaction)

  return (
    <Container>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Create New Transaction</h1>
          <p className="mt-2 text-sm text-gray-700">
            For work completed from <time dateTime="2022-08-01">August 1, 2022</time> to{" "}
            <time dateTime="2022-08-31">August 31, 2022</time>.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <p>
            <Link href={Routes.TransactionsPage()}>
              <a>Transaction</a>
            </Link>
          </p>
        </div>
      </div>
      <TransactionForm
        submitText="Create Transaction"
        onSubmit={async (values) => {
          const transaction = await createTransactionMutation(values)
          router.push(Routes.ShowTransactionPage({ transactionId: transaction.id }))
        }}
      />

      <p>
        <Link href={Routes.TransactionsPage()}>
          <a>Transactions</a>
        </Link>
      </p>
    </Container>
  )
}

NewTransactionPage.getLayout = (page) => (
  <AuthenticatedLayout title={"Create New Transaction"}>{page}</AuthenticatedLayout>
)

export default NewTransactionPage
