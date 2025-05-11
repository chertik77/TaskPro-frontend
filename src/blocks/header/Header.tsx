import { ThemeSelect } from '@/features/user/change-theme'
import { EditProfileModalTrigger } from '@/features/user/edit-profile'
import {
  ToggleSidebarMobileMenuTrigger,
  ToggleSidebarTrigger
} from '@/features/user/toggle-sidebar'

export const Header = () => (
  <header
    className='bg-white-soft flex h-[60px] items-center justify-between px-5 py-3.5
      duration-300 dark:bg-black'>
    <ToggleSidebarTrigger />
    <ToggleSidebarMobileMenuTrigger />
    <div className='flex items-center gap-3.5'>
      <ThemeSelect />
      <EditProfileModalTrigger />
    </div>
  </header>
)
