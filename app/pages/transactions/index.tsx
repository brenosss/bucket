import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import AuthenticatedLayout from "app/core/layouts/AuthenticatedLayout"
import getTransactions from "app/transactions/queries/getTransactions"

const ITEMS_PER_PAGE = 100

export const TransactionsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ transactions, hasMore }] = usePaginatedQuery(getTransactions, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <Link href={Routes.ShowTransactionPage({ transactionId: transaction.id })}>
              <a>{transaction.description}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const TransactionsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Transactions</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTransactionPage()}>
            <a>Create Transaction</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TransactionsList />
        </Suspense>
      </div>
    </>
  )
}

TransactionsPage.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default TransactionsPage
