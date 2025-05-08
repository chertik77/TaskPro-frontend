import { useSidebarStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

export const ToggleMobileSidebarTrigger = () => {
  const toggleMobileSidebar = useSidebarStore(
    state => state.toggleMobileSidebar
  )

  return (
    <button
      onClick={() => toggleMobileSidebar(true)}
      type='button'
      aria-label='Toggle sidebar menu'
      className='desktop:hidden'>
      <Icon
        name='menu'
        className='size-6 stroke-black dark:stroke-white'
      />
    </button>
  )
}
