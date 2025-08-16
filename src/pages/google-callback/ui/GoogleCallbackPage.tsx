import { useEffect } from 'react'

import { Loader } from '@/shared/ui'

import { useGoogleSignin } from '../api/useGoogleSignin'

export const GoogleCallbackPage = () => {
  const { mutate, isPending } = useGoogleSignin()

  useEffect(() => {
    mutate()
  }, [mutate])

  return (
    <div className='bg-soft-green flex h-dvh items-center justify-center'>
      {isPending && <Loader className='size-12' />}
    </div>
  )
}
