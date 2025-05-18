import { Link } from '@tanstack/react-router'

import { useSidebarStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

export const SidebarLogo = () => {
  const setIsOpenMobile = useSidebarStore(state => state.setIsOpenMobile)

  return (
    <div className='tablet:mb-[60px] tablet:pl-6 desktop:pt-6 mb-[70px] pl-3.5'>
      <Link
        className='focus-visible:styled-outline violet:text-brand-violet inline-flex items-center
          gap-2 text-white'
        to='/dashboard'
        onClick={() => setIsOpenMobile(false)}>
        <Icon
          name='logo'
          className='fill-black-muted violet:fill-white-gray size-8'
        />
        <h1 className='violet:text-white text-lg font-semibold text-black dark:text-white'>
          Task Pro
        </h1>
      </Link>
    </div>
  )
}
