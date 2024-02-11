import {
  AuthFormNavigation,
  AuthLayout,
  SigninForm
} from 'components/pages/AuthPages'

const SigninPage = () => (
  <AuthLayout>
    <AuthFormNavigation />
    <SigninForm />
  </AuthLayout>
)

export default SigninPage
