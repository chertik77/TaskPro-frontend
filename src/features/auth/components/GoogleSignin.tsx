import { Icon } from 'shared/ui/icon'

import { useSigninUserWithGoogle } from '../hooks'

export const GoogleSignin = () => {
  const { signinWithGoogle } = useSigninUserWithGoogle()

  return (
    <button
      className='flex w-8xl items-center justify-center gap-2 rounded-lg bg-black py-2.5
        text-center text-white'
      type='button'
      onClick={signinWithGoogle}>
      <Icon
        name='google'
        className='size-7'
      />
      Continue with Google
    </button>
  )
}
