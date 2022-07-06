import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import AuthenticatedLayout from "app/core/layouts/AuthenticatedLayout"
import getBuckets from "app/buckets/queries/getBuckets"
import Container from "app/core/components/Container"

function BucketsTable() {
  const [{ buckets }] = usePaginatedQuery(getBuckets, {
    orderBy: { id: "asc" },
  })

  return (
    <Container>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Buckets</h1>
          <p className="mt-2 text-sm text-gray-700">
            For work completed from <time dateTime="2022-08-01">August 1, 2022</time> to{" "}
            <time dateTime="2022-08-31">August 31, 2022</time>.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <p>
            <Link href={Routes.NewBucketPage()}>
              <a>Create Bucket</a>
            </Link>
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
                Bucket
              </th>
              <th
                scope="col"
                className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Description
              </th>
              <th
                scope="col"
                className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Expected value
              </th>
              <th
                scope="col"
                className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
              >
                Current value
              </th>
            </tr>
          </thead>
          <tbody>
            {buckets.map((bucket) => (
              <tr key={bucket.id} className="border-b border-gray-200">
                <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                  <div className="font-medium text-gray-900">{bucket.name}</div>
                  <div className="mt-0.5 text-gray-500 sm:hidden">{bucket.description}</div>
                </td>
                <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
                  {bucket.description}
                </td>
                <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
                  R${bucket.expectedValue}
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">
                  R${bucket.currentValue}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th
                scope="row"
                colSpan={2}
                className="hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-0"
              >
                Total
              </th>
              <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">
                R$
                {buckets
                  ? buckets
                      .map((b) => (b.expectedValue ? b.expectedValue : 0))
                      .reduce((total, num) => total + num)
                  : "00.00"}
              </td>
              <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">
                R${" "}
                {buckets
                  ? buckets
                      .map((b) => (b.currentValue ? b.currentValue : 0))
                      .reduce((total, num) => total + num)
                  : "00.00"}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Container>
  )
}

const BucketsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Buckets</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <BucketsTable />
        </Suspense>
      </div>
    </>
  )
}

BucketsPage.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default BucketsPage
