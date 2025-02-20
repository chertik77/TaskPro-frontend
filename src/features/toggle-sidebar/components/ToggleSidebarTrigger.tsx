import { useSidebarStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

export const ToggleSidebarTrigger = () => {
  const toggleSidebar = useSidebarStore(state => state.toggleSidebar)

  return (
    <button
      onClick={() => toggleSidebar(prev => !prev)}
      type='button'
      aria-label='Toggle sidebar'
      className='focus-visible:styled-outline mr-auto size-5 max-desktop:hidden'>
      <Icon
        name='sidebar'
        className='size-full fill-white violet:fill-black/80'
      />
    </button>
  )
}
