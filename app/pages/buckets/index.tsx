import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBuckets from "app/buckets/queries/getBuckets"

const ITEMS_PER_PAGE = 100

export const BucketsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ buckets, hasMore }] = usePaginatedQuery(getBuckets, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {buckets.map((bucket) => (
          <li key={bucket.id}>
            <Link href={Routes.ShowBucketPage({ bucketId: bucket.id })}>
              <a>{bucket.name}</a>
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

const BucketsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Buckets</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewBucketPage()}>
            <a>Create Bucket</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <BucketsList />
        </Suspense>
      </div>
    </>
  )
}

BucketsPage.authenticate = true
BucketsPage.getLayout = (page) => <Layout>{page}</Layout>

export default BucketsPage
