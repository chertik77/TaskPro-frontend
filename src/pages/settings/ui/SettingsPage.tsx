import {
  Outlet,
  useLocation,
  useNavigate,
  useRouter
} from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'

import { cn } from '@/shared/lib'

import { MENU_DATA } from '../config/menu-data'

export const SettingsPage = () => {
  const navigate = useNavigate()

  const router = useRouter()

  const { pathname } = useLocation()

  return (
    <div className='flex items-center gap-6'>
      <div
        className='border-accent bg-white-soft dark:border-accent/50 h-full w-65
          border border-b-0 border-l-0 px-6 py-15 dark:bg-black'>
        <div className='mb-8 space-y-6'>
          <button
            onClick={() => router.history.back()}
            className='group hocus:text-black dark:hocus:text-white group flex
              items-center gap-2 text-black/50 transition-colors
              dark:text-white/50'>
            <ArrowLeftIcon
              className='group-hocus:opacity-100 size-4 text-black opacity-50
                transition-opacity dark:text-white'
            />
            Back
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
      <div className='h-full flex-1 py-6 pr-8'>
        <Outlet />
      </div>
    </div>
  )
}
