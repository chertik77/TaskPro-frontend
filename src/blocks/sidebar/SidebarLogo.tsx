import { Link } from '@tanstack/react-router'

import { useSidebarStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

export const SidebarLogo = () => {
  const toggleMobileSidebar = useSidebarStore(
    state => state.toggleMobileSidebar
  )

  return (
    <div
      className='mb-[70px] flex items-center gap-2 pl-3.5 tablet:mb-[60px] tablet:pl-6
        desktop:pt-6'>
      <Link
        className='focus-visible:styled-outline text-white violet:text-brand-violet'
        to='/dashboard'
        onClick={() => toggleMobileSidebar(false)}>
        <Icon
          name='logo'
          className='size-8 fill-black-muted violet:fill-white-gray'
        />
      </Link>
      <h1 className='text-lg font-semibold violet:text-white'>Task Pro</h1>
    </div>
  )
}
