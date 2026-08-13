import { Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { XIcon } from 'lucide-react'

import { MENU_DATA } from '@/entities/setting'

import { cn } from '@/shared/lib'

export const SettingsPage = () => {
  const navigate = useNavigate()

  const { pathname } = useLocation()

  return (
    <div
      className='tablet:flex-row tablet:items-center tablet:gap-6 flex h-full
        flex-col'>
      <div
        className='border-accent bg-white-soft dark:border-accent/50
          tablet:block hidden h-full w-65 border border-b-0 border-l-0 px-6
          py-15 dark:bg-black'>
        <div className='mb-8 space-y-6'>
          <button
            onClick={() => navigate({ to: '/dashboard' })}
            className='group hocus:text-black dark:hocus:text-white group
              focus-visible:styled-outline flex items-center gap-1 text-black/50
              transition-colors dark:text-white/50'>
            <XIcon
              className='group-hocus:opacity-100 size-4 text-black opacity-50
                transition-opacity dark:text-white'
            />
            Close
          </button>
          <h2 className='text-xl'>Settings</h2>
        </div>
        <ul className='space-y-2'>
          {MENU_DATA.map(({ name, icon: Icon, href }) => (
            <li key={name}>
              <button
                onClick={() => navigate({ to: `/dashboard/settings${href}` })}
                className={cn(
                  `group focus-visible:styled-outline hocus:text-black
                  dark:hocus:text-white flex w-full items-center gap-2 py-2
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
      </div>
      <div className='tablet:hidden flex shrink-0 justify-end px-5 pt-5'>
        <button
          type='button'
          onClick={() => navigate({ to: '/dashboard' })}
          className='group focus-visible:styled-outline hocus:text-black
            dark:hocus:text-white flex items-center gap-1 text-black/50
            transition-colors dark:text-white/50'>
          <XIcon
            className='group-hocus:opacity-100 size-4 text-black opacity-50
              transition-opacity dark:text-white'
          />
          Close
        </button>
      </div>
      <div
        className='tablet:h-full tablet:py-6 tablet:pr-8 tablet:px-0 min-h-0
          min-w-0 flex-1 px-5 pt-4 pb-5'>
        <Outlet />
      </div>
    </div>
  )
}
