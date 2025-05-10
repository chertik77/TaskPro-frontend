import { Link } from '@tanstack/react-router'

import { useSidebarStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

export const SidebarLogo = () => {
  const toggleMobileSidebar = useSidebarStore(
    state => state.toggleMobileSidebar
  )

  return (
    <div
      className='tablet:mb-[60px] tablet:pl-6 desktop:pt-6 mb-[70px] flex items-center gap-2
        pl-3.5'>
      <Link
        className='focus-visible:styled-outline violet:text-brand-violet text-white'
        to='/dashboard'
        onClick={() => toggleMobileSidebar(false)}>
        <Icon
          name='logo'
          className='fill-black-muted violet:fill-white-gray size-8'
        />
      </Link>
      <h1 className='violet:text-white text-lg font-semibold'>Task Pro</h1>
    </div>
  )
}
