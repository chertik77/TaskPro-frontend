import { useSidebarStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

import { useLogoutUser } from '../hooks/useLogoutUser'

export const LogoutBtn = () => {
  const { mutate: logoutUser, isPending } = useLogoutUser()

  const setIsOpenOnMobile = useSidebarStore(state => state.setIsOpenOnMobile)

  return (
    <button
      className='focus-visible:styled-outline group flex items-center gap-3.5 bg-transparent
        text-md font-medium violet:text-white'
      disabled={isPending}
      onClick={() => {
        setIsOpenOnMobile(false)
        logoutUser()
      }}>
      <Icon
        name='logout'
        className='size-8 text-brand transition-colors group-hover:text-brand-hover
          group-focus:text-brand-hover violet:text-white
          group-hover:violet:text-brand-third group-focus:violet:text-brand-third'
      />
      {isPending ? 'Logging out...' : 'Log out'}
    </button>
  )
}
