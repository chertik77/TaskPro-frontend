import { useSidebarStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

export const ToggleSidebarTrigger = () => {
  const { setIsOpen } = useSidebarStore()

  return (
    <button
      onClick={() => setIsOpen(prev => !prev)}
      type='button'
      aria-label='Toggle sidebar'
      className='focus-visible:styled-outline max-desktop:hidden mr-auto size-5'>
      <Icon
        name='sidebar'
        className='size-full fill-black/80 dark:fill-white'
      />
    </button>
  )
}
