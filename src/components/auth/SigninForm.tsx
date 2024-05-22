import { useDispatch } from 'react-redux'

import { Button, Field } from 'components/ui'

import { useAppForm, useSigninUser } from 'hooks'

import { authenticate } from 'redux/user.slice'

import { SigninSchema } from 'lib/schemas'

export const SigninForm = () => {
  const dispatch = useDispatch()

  const { handleSubmit, register, formState, reset } =
    useAppForm<SigninSchema>(SigninSchema)

  const { mutateAsync, isPending } = useSigninUser(reset)

  const submit = (data: SigninSchema) => {
    mutateAsync(data).then(r => dispatch(authenticate(r)))
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Field
        {...register('email')}
        placeholder='Enter your email'
        inputName='email'
        className='text-white'
        errors={formState.errors}
      />
      <Field
        {...register('password')}
        isPasswordInput
        inputPasswordPlaceholder='Confirm a password'
        inputName='password'
        className='text-white'
        errors={formState.errors}
      />
      <Button
        type='submit'
        disabled={isPending}>
        {isPending ? 'Loading...' : 'Log In Now'}
      </Button>
    </form>
  )
}
