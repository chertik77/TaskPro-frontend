import { PanelLeftIcon } from 'lucide-react'

import { useSidebarStore } from '@/shared/store'

export const ToggleSidebarTrigger = () => {
  const { setIsOpen } = useSidebarStore()

  return (
    <button
      onClick={() => setIsOpen(prev => !prev)}
      type='button'
      aria-label='Toggle sidebar'
      className='focus-visible:styled-outline max-desktop:hidden mr-auto size-5'>
      <PanelLeftIcon
        className='size-full stroke-black opacity-80 transition-opacity
          dark:stroke-white dark:opacity-100'
      />
    </button>
  )
}
