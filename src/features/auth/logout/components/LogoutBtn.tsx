import { useSidebarStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

import { useLogoutUser } from '../hooks/useLogoutUser'

export const LogoutBtn = () => {
  const { mutate: logoutUser, isPending } = useLogoutUser()

  const toggleMobileSidebar = useSidebarStore(
    state => state.toggleMobileSidebar
  )

  return (
    <button
      type='button'
      className='focus-visible:styled-outline group flex items-center gap-3.5 bg-transparent
        text-lg font-medium violet:text-white'
      disabled={isPending}
      aria-label='Log out'
      onClick={() => {
        toggleMobileSidebar(false)
        logoutUser()
      }}>
      <Icon
        name='logout'
        className='size-8 text-brand transition-colors group-hover:text-brand-light
          group-focus:text-brand-light violet:text-white
          group-hover:violet:text-brand-violet-soft
          group-focus:violet:text-brand-violet-soft'
      />
      {isPending ? 'Logging out...' : 'Log out'}
    </button>
  )
}
