import { ThemeSelect } from '@/features/user/change-theme'
import { EditProfileModalTrigger } from '@/features/user/edit-profile'

import { HeaderControls } from './HeaderControls'

export const Header = () => (
  <header
    className='flex h-[60px] items-center justify-between bg-white-soft px-5 py-3.5
      duration-300 dark:bg-black'>
    <HeaderControls />
    <div className='flex items-center gap-3.5'>
      <ThemeSelect />
      <EditProfileModalTrigger />
    </div>
  </header>
)
