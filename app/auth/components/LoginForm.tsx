import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { BlueButton } from "app/core/components/Buttons"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  const onSubmit = async (values) => {
    try {
      const user = await loginMutation(values)
      props.onSuccess?.(user)
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
      } else {
        return {
          [FORM_ERROR]:
            "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
        }
      }
    }
  }

  return (
    <div>
      <Form
        submitText="Login"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />

        <div>
          <Link href={Routes.ForgotPasswordPage()}>
            <a>Forgot your password?</a>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <Link href={Routes.SignupPage()}>Sign Up</Link>
          </div>
          <div className="flex justify-end">
            <BlueButton type="submit">Login</BlueButton>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default LoginForm
