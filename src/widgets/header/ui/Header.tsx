import { SettingsButton } from './SettingsButton'
import { ToggleMobileMenuTrigger } from './ToggleMobileMenuTrigger'
import { ToggleSidebarTrigger } from './ToggleSidebarTrigger'
import { UserInfo } from './UserInfo'

export const Header = () => (
  <header
    className='bg-white-soft flex min-h-15 items-center justify-between px-5
      py-3.5 dark:bg-black'>
    <ToggleSidebarTrigger />
    <ToggleMobileMenuTrigger />
    <div className='flex items-center gap-4'>
      <SettingsButton />
      <UserInfo />
    </div>
  </header>
)
