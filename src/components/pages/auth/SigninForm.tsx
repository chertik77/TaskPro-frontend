import { Button, Field } from 'components/ui'
import { useAppForm, useIsFormValidOnReload } from 'hooks'
import {
  signinSchema,
  type SigninSchemaFields
} from 'lib/schemas/signin-schema'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { useEffect } from 'react'
import { useSigninMutation } from 'redux/api/user'

export const SigninForm = () => {
  const [signin, { isLoading, isSuccess, isError, data, error }] =
    useSigninMutation()
  const {
    handleSubmit,
    register,
    errors,
    isValid,
    reset,
    trigger,
    clearErrors
  } = useAppForm<SigninSchemaFields>(signinSchema, {
    persistedKey: 'signin-form'
  })
  const { isFormValidOnReload } = useIsFormValidOnReload(trigger, clearErrors)

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
