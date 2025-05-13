import { Icon } from '@/shared/ui'

import { useSigninUserWithGoogle } from '../hooks/useSigninUserWithGoogle'

export const GoogleSignin = () => {
  const signinWithGoogle = useSigninUserWithGoogle()

  return (
    <button
      className='flex w-84 items-center justify-center gap-2 rounded-lg bg-black py-2.5
        text-center text-white'
      type='button'
      aria-label='Continue with Google'
      onClick={signinWithGoogle}>
      <Icon
        name='google'
        className='size-7'
      />
      Continue with Google
    </button>
  )
}
