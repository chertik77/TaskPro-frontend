import { Toaster } from 'sonner'

import { useTabletAndBelowMediaQuery } from '@/shared/hooks'
import { useAuthStore } from '@/shared/store'

export const ToastProvider = () => {
  const theme = useAuthStore(state => state.user.theme)

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
