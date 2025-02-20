import { ToggleSidebarTrigger } from '@/features/toggle-sidebar'

import { useSidebarStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

export const HeaderControls = () => {
  const setIsOpenOnMobile = useSidebarStore(state => state.setIsOpenOnMobile)

  return (
    <>
      <ToggleSidebarTrigger />
      <button
        onClick={() => setIsOpenOnMobile(true)}
        type='button'
        aria-label='Open sidebar menu'
        className='desktop:hidden'>
        <Icon
          name='menu'
          className='size-6 stroke-black dark:stroke-white'
        />
      </button>
    </>
  )
}
