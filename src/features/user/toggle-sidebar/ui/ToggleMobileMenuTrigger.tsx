import { useSidebarStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

export const ToggleMobileMenuTrigger = () => {
  const { setIsOpenMobile } = useSidebarStore()

  return (
    <button
      onClick={() => setIsOpenMobile(true)}
      type='button'
      aria-label='Toggle mobile menu'
      className='desktop:hidden'>
      <Icon
        name='menu'
        className='size-6 stroke-black dark:stroke-white'
      />
    </button>
  )
}
