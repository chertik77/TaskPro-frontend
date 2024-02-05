import { useNavigate } from '@tanstack/react-router'
import { Button } from 'components/ui/button/Button'
import { Field } from 'components/ui/field/Field'
import { useSigninForm } from 'hooks/useSigninForm'
import { handleErrorToast, handleSuccesToast } from 'lib/toasts'
import { useEffect } from 'react'
import { useSigninMutation } from 'redux/api/user'

export const SigninForm = () => {
  const [signin, { isLoading, isSuccess, isError, data, error }] =
    useSigninMutation()
  const { handleSubmit, register, errors, isValid, reset } = useSigninForm()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      navigate({ to: '/dashboard', replace: true })
      reset()
      handleSuccesToast(`Welcome back, ${data?.user.name}!`)
    }
    if (isError && error && 'status' in error)
      handleErrorToast(
        error?.status === 401
          ? 'Invalid email or password. Please try again.'
          : 'Something went wrong during login. Please try again.'
      )
  }, [isError, isSuccess])

  return (
    <form onSubmit={handleSubmit(data => signin(data))}>
      <Field
        {...register('email')}
        placeholder='Enter your email'
        inputName='email'
        className='mb-[14px] text-white'
        errors={errors}
      />
      <Field
        {...register('password')}
        isPasswordInput
        inputPasswordPlaceholder='Confirm a password'
        inputName='password'
        className='mb-6 text-white'
        errors={errors}
      />
      <Button type='submit' disabled={!isValid}>
        {isLoading ? 'Loading...' : 'Log In Now'}
      </Button>
    </form>
  )
}
