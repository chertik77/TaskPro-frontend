import { useNavigate } from '@tanstack/react-router'
import { Button } from 'components/ui/button/Button'
import { Field } from 'components/ui/field/Field'
import { useSignupForm } from 'hooks/useSignupForm'
import { handleErrorToast, handleSuccesToast } from 'lib/toasts'
import { useEffect } from 'react'
import { useSignupMutation } from 'redux/api/user'

export const SignupForm = () => {
  const [signup, { isLoading, isError, isSuccess, data, error }] =
    useSignupMutation()
  const { handleSubmit, register, errors, isValid, reset } = useSignupForm()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      navigate({ to: '/dashboard', replace: true })
      reset()
      handleSuccesToast(`Welcome, ${data?.user.name}!`)
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
        className='mb-[14px] text-white'
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
        inputPasswordPlaceholder='Create a password'
        isPasswordInput
        {...register('password')}
      />
      <Button type='submit' disabled={!isValid}>
        {isLoading ? 'Loading...' : 'Register Now'}
      </Button>
    </form>
  )
}
