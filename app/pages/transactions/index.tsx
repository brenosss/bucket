import { Suspense } from "react"
import { Head, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import AuthenticatedLayout from "app/core/layouts/AuthenticatedLayout"
import getTransactions from "app/transactions/queries/getTransactions"
import Container from "app/core/components/Container"
import { AnchorLink } from "app/core/components/Anchor"

const ITEMS_PER_PAGE = 100

export const TransactionsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ transactions }] = usePaginatedQuery(getTransactions, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  return (
    <Container>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Transactions</h1>
          <p className="mt-2 text-sm text-gray-700">
            For work completed from <time dateTime="2022-08-01">August 1, 2022</time> to{" "}
            <time dateTime="2022-08-31">August 31, 2022</time>.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <p>
            <AnchorLink href={Routes.NewTransactionPage()}>Create Transactions</AnchorLink>
          </p>
        </div>
      </div>
      <div className="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
              >
                Transaction
              </th>
              <th
                scope="col"
                className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Date
              </th>
              <th
                scope="col"
                className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Bucket
              </th>
              <th
                scope="col"
                className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
              >
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-200">
                <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                  <div className="font-medium text-gray-900">{transaction.description}</div>
                </td>
                <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
                  {transaction.date.toDateString()}
                </td>
                <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
                  {transaction.bucket.name}
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">
                  R${transaction.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  )
}

const TransactionsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Transactions</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <TransactionsList />
        </Suspense>
      </div>
    </>
  )
}

TransactionsPage.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default TransactionsPage
