import type { SignupSchemaFields } from 'lib/schemas'

import { useDispatch } from 'react-redux'

import { Button, Field } from 'components/ui'

import { useAppForm, useSignupUser } from 'hooks'

import { authenticate } from 'redux/user.slice'

import { signupSchema } from 'lib/schemas'

export const SignupForm = () => {
  const dispatch = useDispatch()

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
        className='text-white'
        {...register('name')}
      />
      <Field
        errors={formState.errors}
        inputName='email'
        placeholder='Enter your email'
        className='text-white'
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
