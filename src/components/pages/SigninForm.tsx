import { useNavigate } from '@tanstack/react-router'
import { Button } from 'components/ui/button/Button'
import { Field } from 'components/ui/field/Field'
import { useSigninForm } from 'hooks/useSigninForm'
import { handleErrorToast, handleSuccesToast } from 'lib/promise-toast'
import { useEffect } from 'react'
import { useSigninMutation } from 'redux/api/user'

export const SigninForm = () => {
  const [signin, { isLoading, isSuccess, isError, data }] = useSigninMutation()
  const { handleSubmit, register, errors, isValid, reset } = useSigninForm()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      navigate({ to: '/dashboard' })
      reset()
      handleSuccesToast(`Welcome back, ${data?.user.name}!`)
    }
    if (isError)
      handleErrorToast('Something went wrong during login. Please try again.')
  }, [isError, isSuccess])

  return (
    <form onSubmit={handleSubmit(data => signin(data))}>
      <Field
        {...register('email')}
        placeholder='Enter your email'
        inputName='email'
        className='mb-[14px]'
        errors={errors}
      />
      <Field
        {...register('password')}
        isPasswordInput
        inputPasswordPlaceholder='Confirm a password'
        inputName='password'
        className='mb-6'
        errors={errors}
      />
      <Button type='submit' disabled={!isValid}>
        {isLoading ? 'Loading...' : 'Log In Now'}
      </Button>
    </form>
  )
}
