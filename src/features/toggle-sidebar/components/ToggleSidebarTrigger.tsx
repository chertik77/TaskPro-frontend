import { Icon } from '@/shared/components'
import { useSidebarStore } from '@/shared/store'

export const ToggleSidebarTrigger = () => {
  const setIsSidebarOpen = useSidebarStore(state => state.setIsSidebarOpen)

  return (
    <button
      onClick={() => setIsSidebarOpen(prev => !prev)}
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
