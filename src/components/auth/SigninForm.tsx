import { GoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import { Button, Field, Loader } from 'components/ui'

import { useAppForm } from 'hooks'
import { useSigninUser } from 'hooks/auth'

import { authenticate } from 'redux/user.slice'

import { authService } from 'services'

import { SigninSchema } from 'lib/schemas'

export const SigninForm = () => {
  const { handleSubmit, register, formState, reset } =
    useAppForm<SigninSchema>(SigninSchema)

  // useSigninUserWithGoogle()

  const dispatch = useDispatch()

  const { mutate, isPending } = useSigninUser(reset)

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  return (
    <>
      <GoogleLogin
        onSuccess={async credentialResponse => {
          const r = await authService.signinWithGoogle(
            credentialResponse.credential!
          )
          dispatch(authenticate(r))
        }}
        useOneTap={!isMobile}
        auto_select
      />
      <form onSubmit={handleSubmit(data => mutate(data))}>
        <Field
          {...register('email')}
          placeholder='Enter your email'
          inputName='email'
          className='text-white autofill:text-fill-white'
          autoComplete='email'
          errors={formState.errors}
        />
        <Field
          {...register('password')}
          isPasswordInput
          autoComplete='current-password'
          className='text-white autofill:text-fill-white'
          inputPasswordPlaceholder='Confirm a password'
          inputName='password'
          errors={formState.errors}
        />
        <Button
          type='submit'
          disabled={isPending}>
          {isPending ? <Loader /> : 'Log In Now'}
        </Button>
      </form>
    </>
  )
}
