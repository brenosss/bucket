import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import AuthenticatedLayout from "app/core/layouts/AuthenticatedLayout"
import getBucket from "app/buckets/queries/getBucket"
import updateBucket from "app/buckets/mutations/updateBucket"
import { BucketForm, FORM_ERROR } from "app/buckets/components/BucketForm"

export const EditBucket = () => {
  const router = useRouter()
  const bucketId = useParam("bucketId", "number")
  const [bucket, { setQueryData }] = useQuery(
    getBucket,
    { id: bucketId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateBucketMutation] = useMutation(updateBucket)

  return (
    <>
      <Head>
        <title>Edit Bucket {bucket.id}</title>
      </Head>

      <div>
        <h1>Edit Bucket {bucket.id}</h1>
        <pre>{JSON.stringify(bucket, null, 2)}</pre>

        <BucketForm
          submitText="Update Bucket"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateBucket}
          initialValues={bucket}
          onSubmit={async (values) => {
            try {
              const updated = await updateBucketMutation({
                id: bucket.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowBucketPage({ bucketId: updated.id }))
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

const EditBucketPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditBucket />
      </Suspense>

      <p>
        <Link href={Routes.BucketsPage()}>
          <a>Buckets</a>
        </Link>
      </p>
    </div>
  )
}

EditBucketPage.authenticate = true
EditBucketPage.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default EditBucketPage
