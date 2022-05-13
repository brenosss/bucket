import { useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            SignUp in to your account
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
            <SignupForm onSuccess={() => router.push(Routes.Dashboard())} />
          </div>
        </div>
      </div>
    </main>
  )
}

SignupPage.redirectAuthenticatedTo = "/dashboard"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
