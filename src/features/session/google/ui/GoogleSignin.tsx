import { Icon, Loader } from '@/shared/ui'

import { useGoogleOAuthWrapper } from '../api/useGoogleOAuthWrapper'

export const GoogleSignin = () => {
  const { signinWithGoogle, isPending } = useGoogleOAuthWrapper()

  return (
    <button
      className='flex w-84 items-center justify-center gap-2 rounded-lg bg-black py-2.5
        text-center text-white disabled:cursor-not-allowed'
      type='button'
      disabled={isPending}
      aria-label='Continue with Google'
      onClick={signinWithGoogle}>
      {isPending ? (
        <>
          <Loader />
          Signing you in...
        </>
      ) : (
        <>
          <Icon
            name='google'
            className='size-7'
          />
          Continue with Google
        </>
      )}
    </button>
  )
}
