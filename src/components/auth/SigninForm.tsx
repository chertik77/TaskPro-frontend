import { Button, Field, Loader } from 'components/ui'

import { useAppForm } from 'hooks'
import { useSigninUser } from 'hooks/auth'

import { SigninSchema } from 'lib/schemas'

export const SigninForm = () => {
  const { handleSubmit, register, formState, reset } =
    useAppForm<SigninSchema>(SigninSchema)

  // const dispatch = useDispatch()

  // const signinWithGoogle = useGoogleLogin({
  //   flow: 'auth-code',
  //   onSuccess: async ({ code }) => {
  //     const r = await authService.signinWithGoogle(code)

  //     dispatch(authenticate(r))
  //   },
  //   onError: () => {
  //     toast.error(
  //       'Authentication failed: Unable to sign in with Google. Please try again.'
  //     )
  //   }
  // })

  const { mutate, isPending } = useSigninUser(reset)

  return (
    <>
      {/* <button
        onClick={() => signinWithGoogle()}
        className='bg-white'>
        Google
      </button> */}
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
