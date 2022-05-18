import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import AuthenticatedLayout from "app/core/layouts/AuthenticatedLayout"
import Container from "app/core/components/Container"
import createBucket from "app/buckets/mutations/createBucket"
import { BucketForm, FORM_ERROR } from "app/buckets/components/BucketForm"

const NewBucketPage: BlitzPage = () => {
  const router = useRouter()
  const [createBucketMutation] = useMutation(createBucket)

  return (
    <Container>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Create New Bucket</h1>
          <p className="mt-2 text-sm text-gray-700">
            For work completed from <time dateTime="2022-08-01">August 1, 2022</time> to{" "}
            <time dateTime="2022-08-31">August 31, 2022</time>.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <p>
            <Link href={Routes.BucketsPage()}>
              <a>Buckets</a>
            </Link>
          </p>
        </div>
      </div>
      <BucketForm
        onSubmit={async (values) => {
          try {
            const bucket = await createBucketMutation(values)
            router.push(Routes.ShowBucketPage({ bucketId: bucket.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </Container>
  )
}

NewBucketPage.getLayout = (page) => (
  <AuthenticatedLayout title={"Create New Bucket"}>{page}</AuthenticatedLayout>
)

export default NewBucketPage
