import { Dialog } from '@base-ui/react/dialog'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { cn } from 'cn'

import { MENU_DATA } from '../config/menu-data'

type SettingsMobileMenuProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const SettingsMobileMenu = ({
  isOpen,
  onOpenChange
}: SettingsMobileMenuProps) => {
  const navigate = useNavigate()

  const { pathname } = useLocation()

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className='modal-backdrop fixed inset-0 isolate' />
        <Dialog.Popup
          initialFocus={false}
          className='dark:bg-black-soft drawer-left fixed top-0 left-0 flex
            max-h-dvh min-h-dvh w-56.25 flex-col overflow-y-auto bg-white px-6
            py-20'>
          <Dialog.Title className='mb-10 text-xl'>Settings</Dialog.Title>
          <ul className='space-y-2'>
            {MENU_DATA.map(({ name, icon: Icon, href }) => (
              <li key={name}>
                <button
                  type='button'
                  onClick={() => {
                    onOpenChange(false)
                    navigate({ to: `/dashboard/settings${href}` })
                  }}
                  className={cn(
                    `group focus-visible:styled-outline hocus:text-black
                    dark:hocus:text-white flex w-full items-center gap-3 py-2
                    text-black/50 transition-colors dark:text-white/50`,
                    pathname.endsWith(href) &&
                      'text-black dark:text-white [&>svg]:opacity-100'
                  )}>
                  <Icon
                    className='group-hocus:opacity-100 size-5 text-black
                      opacity-50 transition-opacity dark:text-white'
                  />
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
