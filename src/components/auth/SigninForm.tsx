import type { SigninSchemaFields } from 'lib/schemas'

import { Button, Field } from 'components/ui'

import { useAppDispatch, useAppForm, useSigninUser } from 'hooks'

import { authenticate } from 'redux/user.slice'

import { signinSchema } from 'lib/schemas'

export const SigninForm = () => {
  const dispatch = useAppDispatch()

  const { handleSubmit, register, formState, reset } =
    useAppForm<SigninSchemaFields>(signinSchema)

  const { mutateAsync, isPending } = useSigninUser(reset)

  const submit = (data: SigninSchemaFields) => {
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
