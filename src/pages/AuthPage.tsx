import { useLocation } from 'react-router-dom'

import {
  AuthFormNavigation,
  AuthLayout,
  SigninForm,
  SignupForm
} from 'components/auth'

import { Pages } from 'config'

export const AuthPage = () => {
  const { pathname } = useLocation()

  return (
    <AuthLayout>
      <AuthFormNavigation />
      {pathname === Pages.Signin && <SigninForm />}
      {pathname === Pages.Signup && <SignupForm />}
    </AuthLayout>
  )
}
