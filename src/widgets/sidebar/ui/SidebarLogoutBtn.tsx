import { LogOutIcon } from 'lucide-react'

import { useSidebarStore } from '@/shared/store'

import { useLogoutUser } from '../api/useLogoutUser'

export const SidebarLogoutBtn = () => {
  const { logoutUser, isPending } = useLogoutUser()

  const { setIsOpenMobile } = useSidebarStore()

  return (
    <button
      type='button'
      className='focus-visible:styled-outline group flex items-center gap-2
        text-lg font-medium'
      disabled={isPending}
      aria-label='Log out'
      onClick={() => {
        setIsOpenMobile(false)
        logoutUser()
      }}>
      <LogOutIcon
        className='text-accent group-hocus:opacity-50 size-6 transition-opacity'
      />
      {isPending ? 'Logging out...' : 'Log out'}
    </button>
  )
}
