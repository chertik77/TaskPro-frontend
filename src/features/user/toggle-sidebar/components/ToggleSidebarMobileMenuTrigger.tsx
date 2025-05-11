import { useSidebarStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

export const ToggleSidebarMobileMenuTrigger = () => {
  const toggleSidebarMobileMenu = useSidebarStore(
    state => state.toggleSidebarMobileMenu
  )

  return (
    <button
      onClick={() => toggleSidebarMobileMenu(true)}
      type='button'
      aria-label='Toggle sidebar mobile menu'
      className='desktop:hidden'>
      <Icon
        name='menu'
        className='size-6 stroke-black dark:stroke-white'
      />
    </button>
  )
}
