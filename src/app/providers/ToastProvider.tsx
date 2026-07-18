import { Toaster } from 'sonner'

import { useSettings } from '@/entities/setting'

import { useTabletAndBelowMediaQuery } from '@/shared/lib'

export const ToastProvider = () => {
  const { data: theme } = useSettings(state => state.general?.theme)

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
