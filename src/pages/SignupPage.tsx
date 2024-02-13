import {
  AuthFormNavigation,
  AuthLayout,
  SignupForm
} from 'components/pages/AuthPages'

const SignupPage = () => (
  <AuthLayout>
    <AuthFormNavigation />
    <SignupForm />
  </AuthLayout>
)

export default SignupPage
