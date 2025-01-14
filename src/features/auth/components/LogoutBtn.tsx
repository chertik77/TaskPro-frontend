import { useModal } from 'react-modal-state'

import { SidebarMobileModal } from 'features/sidebar/components'

import { Icon } from 'components/ui'

import { useLogoutUser } from '../hooks'

export const LogoutBtn = () => {
  const { mutate: logoutUser, isPending } = useLogoutUser()

  const { close: closeSidebarMobileModal } = useModal(SidebarMobileModal)

  return (
    <button
      className='focus-visible:styled-outline group flex items-center gap-3.5 bg-transparent
        text-md font-medium violet:text-white'
      disabled={isPending}
      onClick={() => {
        closeSidebarMobileModal()
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
