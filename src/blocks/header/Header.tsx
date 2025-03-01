import {
  ToggleMobileSidebarTrigger,
  ToggleSidebarTrigger
} from '@/features/toggle-sidebar'
import { ThemeSelect } from '@/features/user/change-theme'
import { EditProfileModalTrigger } from '@/features/user/edit-profile'

export const Header = () => (
  <header
    className='flex h-[60px] items-center justify-between bg-white-soft px-5 py-3.5
      duration-300 dark:bg-black'>
    <ToggleSidebarTrigger />
    <ToggleMobileSidebarTrigger />
    <div className='flex items-center gap-3.5'>
      <ThemeSelect />
      <EditProfileModalTrigger />
    </div>
  </header>
)
