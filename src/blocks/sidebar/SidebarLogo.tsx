import { Link } from '@tanstack/react-router'
import { useModal } from 'react-modal-state'

import { Icon } from '@/shared/components/ui'

import { SidebarMobileModal } from './SidebarMobileModal'

export const SidebarLogo = () => {
  const { close: closeSidebarMobileModal } = useModal(SidebarMobileModal)

  return (
    <div
      className='mb-[70px] flex items-center gap-2 pl-3.5 tablet:mb-[60px] tablet:pl-6
        desktop:pt-6'>
      <Link
        className='focus-visible:styled-outline text-white violet:text-brand-secondary'
        to='/dashboard'
        onClick={closeSidebarMobileModal}>
        <Icon
          name='logo'
          className='size-8 fill-black-third violet:fill-white-gray-secondary'
        />
      </Link>
      <h1 className='text-md font-semibold violet:text-white'>Task Pro</h1>
    </div>
  )
}
