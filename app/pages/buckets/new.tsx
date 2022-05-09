import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createBucket from "app/buckets/mutations/createBucket"
import { BucketForm, FORM_ERROR } from "app/buckets/components/BucketForm"

const NewBucketPage: BlitzPage = () => {
  const router = useRouter()
  const [createBucketMutation] = useMutation(createBucket)

  return (
    <div>
      <h1>Create New Bucket</h1>

      <BucketForm
        submitText="Create Bucket"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateBucket}
        // initialValues={{}}
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

      <p>
        <Link href={Routes.BucketsPage()}>
          <a>Buckets</a>
        </Link>
      </p>
    </div>
  )
}

NewBucketPage.authenticate = true
NewBucketPage.getLayout = (page) => <Layout title={"Create New Bucket"}>{page}</Layout>

export default NewBucketPage
