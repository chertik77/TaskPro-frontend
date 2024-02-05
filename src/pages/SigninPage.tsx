import { AuthFormNavigation } from 'components/pages/AuthFormNavigation'
import { SigninForm } from 'components/pages/SigninForm'

export const SigninPage = () => (
  <div className='h-dvh flex items-center justify-center adaptive:px-5 bg-welcome-page-gradient'>
    <div className='rounded-lg bg-black w-[335px] p-6 tablet:w-[424px] tablet:p-10'>
      <AuthFormNavigation />
      <SigninForm />
    </div>
  </div>
)
