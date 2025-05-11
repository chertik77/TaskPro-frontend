import { useSidebarStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

import { useLogoutUser } from '../hooks/useLogoutUser'

export const LogoutBtn = () => {
  const { mutate: logoutUser, isPending } = useLogoutUser()

  const toggleSidebarMobileMenu = useSidebarStore(
    state => state.toggleSidebarMobileMenu
  )

  return (
    <button
      type='button'
      className='focus-visible:styled-outline group violet:text-white flex items-center gap-3.5
        bg-transparent text-lg font-medium'
      disabled={isPending}
      aria-label='Log out'
      onClick={() => {
        toggleSidebarMobileMenu(false)
        logoutUser()
      }}>
      <Icon
        name='logout'
        className='text-brand group-hover:text-brand-light group-focus:text-brand-light
          violet:text-white group-hover:violet:text-brand-violet-soft
          group-focus:violet:text-brand-violet-soft size-8 transition-colors'
      />
      {isPending ? 'Logging out...' : 'Log out'}
    </button>
  )
}
