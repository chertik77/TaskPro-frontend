import { useNavigate } from '@tanstack/react-router'
import { Button } from 'components/ui/button/Button'
import { Field } from 'components/ui/field/Field'
import { useSignupForm } from 'hooks/useSignupForm'
import { handleErrorToast, handleSuccesToast } from 'lib/toasts'
import { useEffect } from 'react'
import { useSignupMutation } from 'redux/api/user'

export const SignupForm = () => {
  const [signup, { isLoading, isError, isSuccess, data }] = useSignupMutation()
  const { handleSubmit, register, errors, isValid, reset } = useSignupForm()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      navigate({ to: '/dashboard' })
      reset()
      handleSuccesToast(`Welcome, ${data?.user.name}!`)
    }
    if (isError)
      handleErrorToast(
        'Something went wrong during registration. Please try again.'
      )
  }, [isError, isSuccess])

  return (
    <form onSubmit={handleSubmit(data => signup(data))}>
      <Field
        errors={errors}
        inputName='name'
        placeholder='Enter your name'
        className='mb-[14px]'
        {...register('name')}
      />
      <Field
        errors={errors}
        inputName='email'
        placeholder='Enter your email'
        className='mb-[14px]'
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
