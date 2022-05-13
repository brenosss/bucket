import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
      <div className="text-center justify-center">
        <LoginForm
          onSuccess={(_user) => {
            const next = router.query.next
              ? decodeURIComponent(router.query.next as string)
              : "/dashboard"
            router.push(next)
          }}
        />
      </div>
    </main>
  )
}

LoginPage.redirectAuthenticatedTo = "/dashboard"
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
