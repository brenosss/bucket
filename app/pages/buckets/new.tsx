import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import AuthenticatedLayout from "app/core/layouts/AuthenticatedLayout"
import createBucket from "app/buckets/mutations/createBucket"
import { BucketForm, FORM_ERROR } from "app/buckets/components/BucketForm"

export function Container({ children, className }: ComponentProps) {
  return <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

type ComponentProps = {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: ComponentProps) {
  return (
    <div
      className={`bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 ${className}`}
    >
      {children}
    </div>
  )
}

export function CardSection({ children }: ComponentProps) {
  return <div className="px-4 py-5 sm:px-6">{children}</div>
}

const NewBucketPage: BlitzPage = () => {
  const router = useRouter()
  const [createBucketMutation] = useMutation(createBucket)

  return (
    <Container className="mx-3">
      <Card>
        <CardSection>
          <h1>
            <strong>Create New Bucket</strong>
          </h1>
        </CardSection>

        <CardSection>
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
        </CardSection>
      </Card>

      <p>
        <Link href={Routes.BucketsPage()}>
          <a>Buckets</a>
        </Link>
      </p>
    </Container>
  )
}

NewBucketPage.authenticate = true
NewBucketPage.getLayout = (page) => (
  <AuthenticatedLayout title={"Create New Bucket"}>{page}</AuthenticatedLayout>
)

export default NewBucketPage
