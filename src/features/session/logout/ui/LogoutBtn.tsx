import { useSidebarStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

import { useLogoutUser } from '../api/useLogoutUser'

export const LogoutBtn = () => {
  const { mutate: logoutUser, isPending } = useLogoutUser()

  const { setIsOpenMobile } = useSidebarStore()

  return (
    <button
      type='button'
      className='focus-visible:styled-outline group violet:text-white flex
        items-center gap-3.5 text-lg font-medium'
      disabled={isPending}
      aria-label='Log out'
      onClick={() => {
        setIsOpenMobile(false)
        logoutUser()
      }}>
      <Icon
        name='logout'
        className='text-brand group-hocus:text-brand-light violet:text-white
          group-hocus:violet:text-brand-violet-soft size-8 transition-colors'
      />
      {isPending ? 'Logging out...' : 'Log out'}
    </button>
  )
}
