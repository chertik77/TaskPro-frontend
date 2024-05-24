import { useDispatch } from 'react-redux'

import { Button, Field } from 'components/ui'

import { useAppForm, useSignupUser } from 'hooks'

import { authenticate } from 'redux/user.slice'

import { SignupSchema } from 'lib/schemas'

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
        autoComplete='name'
        placeholder='Enter your name'
        className='text-white'
        {...register('name')}
      />
      <Field
        errors={formState.errors}
        inputName='email'
        autoComplete='email'
        placeholder='Enter your email'
        className='text-white'
        {...register('email')}
      />
      <Field
        errors={formState.errors}
        inputName='password'
        className='text-white'
        autoComplete='new-password'
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
