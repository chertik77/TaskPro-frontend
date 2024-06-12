import { GoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'

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

  // const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  return (
    <>
      <GoogleLogin
        onSuccess={async credentialResponse => {
          const r = await authService.signinWithGoogle(
            credentialResponse.credential!
          )
          dispatch(authenticate(r))
        }}
        prompt_parent_id='g_id_onload'
        useOneTap={true}
        auto_select
      />
      <div
        data-prompt_parent_id='g_id_onload'
        id='g_id_onload'
        className='absolute right-5 top-5'
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
