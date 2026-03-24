import { Loader } from '@/shared/ui'

import { useGoogleSignin } from '../api/useGoogleSignin'

export const GoogleCallbackPage = () => {
  const { isPending } = useGoogleSignin()

  return (
    <div className='bg-soft-green flex h-dvh items-center justify-center'>
      {isPending && <Loader className='size-12' />}
    </div>
  )
}
