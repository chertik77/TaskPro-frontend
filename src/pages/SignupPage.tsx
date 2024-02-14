import {
  AuthFormNavigation,
  AuthLayout,
  SignupForm
} from 'components/pages/auth'

const SignupPage = () => (
  <AuthLayout>
    <AuthFormNavigation />
    <SignupForm />
  </AuthLayout>
)

export default SignupPage
