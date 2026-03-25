import { Toaster } from 'sonner'

import { useMe } from '@/entities/user'

import { useTabletAndBelowMediaQuery } from '@/shared/lib'

export const ToastProvider = () => {
  const user = useMe()

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  return (
    <Toaster
      position={isTabletAndBelow ? 'top-center' : 'bottom-right'}
      richColors
      closeButton
      duration={5000}
      theme={user?.theme === 'dark' ? 'dark' : 'light'}
      className='text-balance'
    />
  )
}
