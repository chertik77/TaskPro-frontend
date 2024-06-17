import { Button, Field, Loader } from 'components/ui'

import { useAppForm } from 'hooks'
import { useGoogleOneTap, useSignupUser } from 'hooks/auth'

import { SignupSchema } from 'lib/schemas'

export const SignupForm = () => {
  const { handleSubmit, register, formState, reset } =
    useAppForm<SignupSchema>(SignupSchema)

  useGoogleOneTap()

  const { mutate, isPending } = useSignupUser(reset)

  return (
    <form onSubmit={handleSubmit(data => mutate(data))}>
      <Field
        errors={formState.errors}
        inputName='name'
        autoComplete='name'
        className='text-white autofill:text-fill-white'
        placeholder='Enter your name'
        {...register('name')}
      />
      <Field
        errors={formState.errors}
        inputName='email'
        autoComplete='email'
        className='text-white autofill:text-fill-white'
        placeholder='Enter your email'
        {...register('email')}
      />
      <Field
        errors={formState.errors}
        inputName='password'
        autoComplete='new-password'
        className='text-white autofill:text-fill-white'
        inputPasswordPlaceholder='Create a password'
        isPasswordInput
        {...register('password')}
      />
      <Button
        type='submit'
        disabled={isPending}>
        {isPending ? <Loader /> : 'Register Now'}
      </Button>
    </form>
  )
}
