import { useLocation } from 'react-router-dom'

import {
  AuthFormNavigation,
  AuthLayout,
  SigninForm,
  SignupForm
} from 'components/auth'

export const AuthPage = () => {
  const { pathname } = useLocation()

  return (
    <AuthLayout>
      <AuthFormNavigation />
      {pathname === '/signin' && <SigninForm />}
      {pathname === '/signup' && <SignupForm />}
    </AuthLayout>
  )
}
