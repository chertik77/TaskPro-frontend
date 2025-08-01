import { Toaster } from 'sonner'

import { useTabletAndBelowMediaQuery } from '@/shared/lib'

export const ToastProvider = () => {
  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  //! ADD Theme
  return (
    <Toaster
      position={isTabletAndBelow ? 'top-center' : 'bottom-right'}
      richColors
      closeButton
      duration={5000}
      className='text-balance'
    />
  )
}
