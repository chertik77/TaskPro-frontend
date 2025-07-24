import { useEffect } from 'react'

import { Loader } from '@/shared/ui'

import { useGoogleSignin } from '../api/useGoogleSignin'

export const GoogleAuthLoader = () => {
  const { mutate, isPending } = useGoogleSignin()

  useEffect(() => {
    mutate()
  }, [mutate])

  return <div>{isPending && <Loader className='size-12' />}</div>
}
