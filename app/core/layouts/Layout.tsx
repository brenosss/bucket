import { Head, BlitzLayout } from "blitz"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { BlueButton } from "../components/Buttons"
import logout from "app/auth/mutations/logout"
import { Link, useMutation, Routes } from "blitz"
import { Suspense, MouseEventHandler } from "react"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <BlueButton
          onClick={async () => {
            await logoutMutation()
          }}
        >
          <strong>Logout</strong>
        </BlueButton>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.LoginPage()}>
          <a className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
            <strong>Login</strong>
          </a>
        </Link>
        <Link href={Routes.SignupPage()}>
          <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            <strong>Sign Up</strong>
          </a>
        </Link>
      </>
    )
  }
}

const NavBar = () => {
  return (
    <nav
      className="relative flex items-center justify-between sm:h-10 md:justify-center px-4"
      aria-label="Global"
    >
      <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
        <Suspense>
          <UserInfo />
        </Suspense>
      </div>
    </nav>
  )
}

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "budget"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="relative pt-6 pb-16 sm:pb-24">
          <NavBar />
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout
