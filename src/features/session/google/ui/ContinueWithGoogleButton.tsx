import { Icon, Loader } from '@/shared/ui'

import { useInitiateGoogleSignin } from '../api/useInitiateGoogleSignin'

export const ContinueWithGoogleButton = () => {
  const { mutate, isPending } = useInitiateGoogleSignin()

  return (
    <button
      type='button'
      className='flex w-84 items-center justify-center gap-2 rounded-lg bg-black
        py-2.5 text-center text-white'
      onClick={() => mutate()}>
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
