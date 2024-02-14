import { Button, Field } from 'components/ui'
import { useAppForm, useIsFormValidOnReload } from 'hooks'
import {
  signupSchema,
  type SignupSchemaFields
} from 'lib/schemas/signup-schema'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { useSignupMutation } from 'redux/api/user'

export const SignupForm = () => {
  const [signup, { isLoading }] = useSignupMutation()
  const {
    handleSubmit,
    register,
    errors,
    isValid,
    reset,
    trigger,
    clearErrors
  } = useAppForm<SignupSchemaFields>(signupSchema, {
    persistedKey: 'signup-form'
  })
  const { isFormValidOnReload } = useIsFormValidOnReload(trigger, clearErrors)

  const submit = (data: SignupSchemaFields) => {
    signup(data)
      .unwrap()
      .then(r => {
        reset()
        handleSuccessToast(
          `Welcome, ${r?.user.name}! Your account has been successfully created. Let's get started!`
        )
      })
      .catch(e => {
        handleErrorToast(
          e?.status === 409
            ? 'User with this email already exists. Please try different email.'
            : 'Oops! Something went wrong during registration. Please check your details and try again.'
        )
      })
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
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
