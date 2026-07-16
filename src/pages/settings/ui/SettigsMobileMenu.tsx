import { Dialog } from '@base-ui/react/dialog'
import { useNavigate, useRouter } from '@tanstack/react-router'

import { cn } from '@/shared/lib'

import { MENU_DATA } from '../config/menu-data'

export const SettingsMobileMenu = () => {
  const { history, state } = useRouter()

  const navigate = useNavigate()

  const handleOpenChange = () => {
    if (state.location.pathname === '/dashboard/settings') {
      history.back()
    }
  }

  return (
    <Dialog.Root
      open
      onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop
          className='data-open:animate-modal-overlay-in
            data-closed:animate-modal-overlay-out bg-black-overlay fixed inset-0
            isolate backdrop-blur-md backdrop-saturate-150'
        />
        <Dialog.Popup
          initialFocus={false}
          className='dark:bg-black-soft data-open:animate-modal-in
            data-closed:animate-modal-out after:bg-black-overlay fixed top-0
            left-0 flex max-h-dvh min-h-dvh w-56.25 flex-col overflow-y-scroll
            bg-white py-20 pl-6'>
          <Dialog.Title className='mb-10 text-xl'>Settings</Dialog.Title>
          <ul className='space-y-2'>
            {MENU_DATA.map(({ name, icon: Icon, href }) => (
              <li key={name}>
                <button
                  onClick={() => navigate({ to: `/dashboard/settings${href}` })}
                  className={cn(
                    `hocus:text-black dark:hocus:text-white flex w-full
                    items-center gap-3 py-2 text-black/50 transition-colors
                    dark:text-white/50`
                  )}>
                  <Icon className='size-5 stroke-current transition-colors' />
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
