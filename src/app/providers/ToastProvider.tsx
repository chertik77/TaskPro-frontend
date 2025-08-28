import { Toaster } from 'sonner'

import { useTabletAndBelowMediaQuery } from '@/shared/lib'

export const ToastProvider = () => {
  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  // const { data: user } = useQuery(userQueries.me())

  return (
    <Toaster
      position={isTabletAndBelow ? 'top-center' : 'bottom-right'}
      richColors
      closeButton
      duration={5000}
      // theme={user?.theme === 'dark' ? 'dark' : 'light'}
      className='text-balance'
    />
  )
}
