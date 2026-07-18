import { Outlet, useLocation, useNavigate } from '@tanstack/react-router'

import { cn } from '@/shared/lib'

import { MENU_DATA } from '../config/menu-data'

export const SettingsPage = () => {
  const navigate = useNavigate()

  const { pathname } = useLocation()

  return (
    <div className='flex items-center gap-6'>
      <div
        className='border-accent bg-white-soft dark:border-accent/50 h-full w-65
          border border-b-0 border-l-0 px-6 py-20 dark:bg-black'>
        <h2 className='mb-8 text-xl'>Settings</h2>
        <ul className='space-y-2'>
          {MENU_DATA.map(({ name, icon: Icon, href }) => (
            <li key={name}>
              <button
                onClick={() => navigate({ to: `/dashboard/settings${href}` })}
                className={cn(
                  `hocus:text-black dark:hocus:text-white
                  focus-visible:styled-outline flex w-full items-center gap-2
                  py-2 text-black/50 transition-colors dark:text-white/50`,
                  pathname.endsWith(href) && 'text-black dark:text-white'
                )}>
                <Icon className='size-5 transition-colors' />
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className='h-full flex-1 py-6 pr-8'>
        <Outlet />
      </div>
    </div>
  )
}
