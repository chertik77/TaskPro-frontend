import type { SignupSchemaFields } from 'lib/schemas'

import { authenticate } from 'redux/slices/user/user-slice'

import { Button, Field } from 'components/ui'

import { useAppDispatch, useAppForm } from 'hooks'
import { useSignupUser } from 'hooks/auth/useSignupUser'

import { signupSchema } from 'lib/schemas'

export const SignupForm = () => {
  const dispatch = useAppDispatch()

  const { handleSubmit, register, formState, reset } =
    useAppForm<SignupSchemaFields>(signupSchema)

  const { mutateAsync, isPending } = useSignupUser(reset)

  const submit = (data: SignupSchemaFields) => {
    mutateAsync(data).then(r => dispatch(authenticate(r)))
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Field
        errors={formState.errors}
        inputName='name'
        placeholder='Enter your name'
        className='mb-[14px] text-white violet:text-white'
        {...register('name')}
      />
      <Field
        errors={formState.errors}
        inputName='email'
        placeholder='Enter your email'
        className='mb-[14px] text-white'
        {...register('email')}
      />
      <Field
        errors={formState.errors}
        inputName='password'
        className='text-white'
        inputPasswordPlaceholder='Create a password'
        isPasswordInput
        {...register('password')}
      />
      <Button
        type='submit'
        disabled={isPending}>
        {isPending ? 'Loading...' : 'Register Now'}
      </Button>
    </form>
  )
}
