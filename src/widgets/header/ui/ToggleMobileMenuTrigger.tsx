import { MenuIcon } from 'lucide-react'

import { useSidebarStore } from '@/shared/store'

export const ToggleMobileMenuTrigger = () => {
  const { setIsOpenMobile } = useSidebarStore()

  return (
    <button
      onClick={() => setIsOpenMobile(true)}
      type='button'
      aria-label='Toggle mobile menu'
      className='desktop:hidden'>
      <MenuIcon className='size-6' />
    </button>
  )
}
