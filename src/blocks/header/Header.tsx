import { ThemeSelect } from '@/features/user/change-theme'
import { EditProfileDialog } from '@/features/user/edit-profile'
import {
  ToggleMobileMenuTrigger,
  ToggleSidebarTrigger
} from '@/features/user/toggle-sidebar'

export const Header = () => (
  <header
    className='bg-white-soft flex h-[60px] items-center justify-between px-5 py-3.5
      duration-300 dark:bg-black'>
    <ToggleSidebarTrigger />
    <ToggleMobileMenuTrigger />
    <div className='flex items-center gap-3.5'>
      <ThemeSelect />
      <EditProfileDialog />
    </div>
  </header>
)
