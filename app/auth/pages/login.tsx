import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              contact to start a free trial
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <LoginForm
              onSuccess={(_user) => {
                const next = router.query.next
                  ? decodeURIComponent(router.query.next as string)
                  : "/dashboard"
                router.push(next)
              }}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

LoginPage.redirectAuthenticatedTo = "/dashboard"
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
