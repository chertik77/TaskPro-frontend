import { LoginForm } from 'components/pages/AuthPage/LoginForm'
import { RegisterForm } from 'components/pages/AuthPage/RegisterForm'

export const AuthPage = () => {
  return (
    <div>
      <p>AuthPage</p>
      <RegisterForm />
      <LoginForm />
    </div>
  )
}
