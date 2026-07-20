import { Toaster } from 'sonner'

import { useSettings } from '@/entities/setting'

import { useMediaQuery } from '@/shared/lib'

export const ToastProvider = () => {
  const { data: theme } = useSettings(state => state.general.theme)

  const isTabletAndBelow = useMediaQuery('(max-width: 1025px)')

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
