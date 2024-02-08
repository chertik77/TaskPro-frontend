import { Button, Field } from 'components/ui'
import { useIsFormValidOnReload, useSignupForm } from 'hooks'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { useEffect } from 'react'
import { useSignupMutation } from 'redux/api/user'

export const SignupForm = () => {
  const [signup, { isLoading, isError, isSuccess, data, error }] =
    useSignupMutation()
  const { handleSubmit, register, errors, isValid, reset, trigger } =
    useSignupForm()
  const { isFormValidOnReload } = useIsFormValidOnReload(trigger)

  useEffect(() => {
    if (isSuccess) {
      reset()
      handleSuccessToast(`Welcome, ${data?.user.name}!`)
    }
    if (isError && error && 'status' in error)
      handleErrorToast(
        error?.status === 409
          ? 'User with this email already exists. Please try different email.'
          : 'Something went wrong during registration. Please try again.'
      )
  }, [isError, isSuccess])

  return (
    <form onSubmit={handleSubmit(data => signup(data))}>
      <Field
        errors={errors}
        inputName='name'
        placeholder='Enter your name'
        className='mb-[14px] text-white violet:text-white'
        {...register('name')}
      />
      <Field
        errors={errors}
        inputName='email'
        placeholder='Enter your email'
        className='mb-[14px] text-white'
        {...register('email')}
      />
      <Field
        errors={errors}
        inputName='password'
        className='text-white'
        inputPasswordPlaceholder='Create a password'
        isPasswordInput
        {...register('password')}
      />
      <Button
        type='submit'
        disabled={!isValid || !isFormValidOnReload || isLoading}>
        {isLoading ? 'Loading...' : 'Register Now'}
      </Button>
    </form>
  )
}
