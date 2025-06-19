import { Toaster } from 'sonner'

import { useSessionStore } from '@/entities/session'

import { useTabletAndBelowMediaQuery } from '@/shared/lib'

export const ToastProvider = () => {
  const {
    user: { theme }
  } = useSessionStore()

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  return (
    <Toaster
      position={isTabletAndBelow ? 'top-center' : 'bottom-right'}
      richColors
      closeButton
      duration={5000}
      theme={theme === 'dark' ? 'dark' : 'light'}
      className='text-balance'
    />
  )
}
