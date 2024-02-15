import { Button, Field } from 'components/ui'
import { useAppForm, useIsFormValidOnReload } from 'hooks'
import { signinSchema, type SigninSchemaFields } from 'lib/schemas'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { useSigninMutation } from 'redux/api/user'

export const SigninForm = () => {
  const [signin, { isLoading }] = useSigninMutation()
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

  const submit = (data: SigninSchemaFields) => {
    signin(data)
      .unwrap()
      .then(r => {
        reset()
        localStorage.removeItem('signin-form')
        handleSuccessToast(
          `Welcome back, ${r?.user?.name}! We're glad to see you again.`
        )
      })
      .catch(e => {
        handleErrorToast(
          e?.status === 401
            ? 'Invalid email or password. Please try again.'
            : 'Oops! Something went wrong during sign-in. Please check your details and try again.'
        )
      })
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
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
