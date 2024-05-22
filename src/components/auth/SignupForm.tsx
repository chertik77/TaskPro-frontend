import type { SignupSchema } from 'lib/schemas'

import { useDispatch } from 'react-redux'

import { Button, Field } from 'components/ui'

import { useAppForm, useSignupUser } from 'hooks'

import { authenticate } from 'redux/user.slice'

export const SignupForm = () => {
  const dispatch = useDispatch()

  const { handleSubmit, register, formState, reset } =
    useAppForm<SignupSchema>(SignupSchema)

  const { mutateAsync, isPending } = useSignupUser(reset)

  const submit = (data: SignupSchema) => {
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
