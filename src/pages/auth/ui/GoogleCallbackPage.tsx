import { useGoogleSignin } from '@/features/session/google'

import { Loader } from '@/shared/ui'

export const GoogleCallbackPage = () => {
  const { isPending } = useGoogleSignin()

  return <div>{isPending && <Loader className='size-12' />}</div>
}
