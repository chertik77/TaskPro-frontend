import type { SigninSchemaFields } from 'lib/schemas'

import { authenticate } from 'redux/slices/user/user-slice'

import { Button, Field } from 'components/ui'

import { useAppDispatch, useAppForm } from 'hooks'
import { useSigninUser } from 'hooks/auth/useSigninUser'

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
        className='mb-[14px] text-white'
        errors={formState.errors}
      />
      <Field
        {...register('password')}
        isPasswordInput
        inputPasswordPlaceholder='Confirm a password'
        inputName='password'
        className='mb-6 text-white'
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
