import { Navigate } from '@tanstack/react-router'
import { AuthFormNavigation } from 'components/pages/AuthFormNavigation'
import { SigninForm } from 'components/pages/SigninForm'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from 'redux/slices/user/user-slice'

export const SigninPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return (
    <>
      {isLoggedIn ? (
        <Navigate to='/dashboard' />
      ) : (
        <div className='h-screen flex items-center justify-center adaptive:px-5 bg-welcome-page-gradient'>
          <div className='rounded-lg bg-black w-[335px] p-6 tablet:w-[424px] tablet:p-10'>
            <AuthFormNavigation />
            <SigninForm />
          </div>
        </div>
      )}
    </>
  )
}
