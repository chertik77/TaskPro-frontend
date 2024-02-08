import { Button, Field } from 'components/ui'
import { useIsFormValidOnReload, useSigninForm } from 'hooks'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { useEffect } from 'react'
import { useSigninMutation } from 'redux/api/user'

export const SigninForm = () => {
  const [signin, { isLoading, isSuccess, isError, data, error }] =
    useSigninMutation()
  const { handleSubmit, register, errors, isValid, reset, trigger } =
    useSigninForm()
  const { isFormValidOnReload } = useIsFormValidOnReload(trigger)

  useEffect(() => {
    if (isSuccess) {
      reset()
      handleSuccessToast(`Welcome back, ${data?.user.name}!`)
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
      <Button
        type='submit'
        disabled={!isValid || !isFormValidOnReload || isLoading}>
        {isLoading ? 'Loading...' : 'Log In Now'}
      </Button>
    </form>
  )
}