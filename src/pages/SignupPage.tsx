import { AuthFormNavigation } from 'components/pages/AuthFormNavigation'
import { SignupForm } from 'components/pages/SignupForm'

export const SignupPage = () => (
  <div className='h-screen flex items-center justify-center adaptive:px-5 bg-welcome-page-gradient'>
    <div className='rounded-lg bg-black w-[335px] p-6 tablet:w-[424px] tablet:p-10'>
      <AuthFormNavigation />
      <SignupForm />
    </div>
  </div>
)
