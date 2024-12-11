import {
  AuthFormNavigation,
  AuthLayout,
  SigninForm,
  SignupForm
} from 'features/authentication/components'
import { useLocation } from 'react-router-dom'

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
