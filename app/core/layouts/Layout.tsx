import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Button, ButtonLink } from "app/core/components/Buttons"
import { AnchorLink } from "app/core/components/Anchor"
import logout from "app/auth/mutations/logout"
import { Link, useMutation, Routes, Head, BlitzLayout } from "blitz"
import { Suspense } from "react"
import { Logo } from "app/core/components/Logo"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Button
          color="blue"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          <strong>Logout</strong>
        </Button>
      </>
    )
  } else {
    return (
      <>
        <AnchorLink href={Routes.LoginPage()}>Login</AnchorLink>
        <ButtonLink className="ml-5" color="blue" href={Routes.SignupPage()}>
          Sign Up
        </ButtonLink>
      </>
    )
  }
}

const NavBar = () => {
  return (
    <nav className="relative flex items-center justify-between sm:h-10 md:justify-center px-8 py-10">
      <div className="md:flex items-center justify-start md:flex-1 lg:w-0 ml-10">
        <Link href={Routes.Dashboard()}>
          <a>
            <Logo />
          </a>
        </Link>
      </div>
      <div className="md:flex items-center justify-end md:flex-1 lg:w-0 mr-10">
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
