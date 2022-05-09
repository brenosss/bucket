import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBucket from "app/buckets/queries/getBucket"
import deleteBucket from "app/buckets/mutations/deleteBucket"

export const Bucket = () => {
  const router = useRouter()
  const bucketId = useParam("bucketId", "number")
  const [deleteBucketMutation] = useMutation(deleteBucket)
  const [bucket] = useQuery(getBucket, { id: bucketId })

  return (
    <>
      <Head>
        <title>Bucket {bucket.id}</title>
      </Head>

      <div>
        <h1>Bucket {bucket.id}</h1>
        <pre>{JSON.stringify(bucket, null, 2)}</pre>

        <Link href={Routes.EditBucketPage({ bucketId: bucket.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteBucketMutation({ id: bucket.id })
              router.push(Routes.BucketsPage())
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

const ShowBucketPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.BucketsPage()}>
          <a>Buckets</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Bucket />
      </Suspense>
    </div>
  )
}

ShowBucketPage.authenticate = true
ShowBucketPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowBucketPage
