import { useEffect } from 'react'
import * as Select from '@radix-ui/react-select'

import { useAuthStore } from '@/entities/auth'
import { DEFAULT_THEME, THEMES } from '@/entities/user'

import { Icon } from '@/shared/ui'

import { useChangeTheme } from '../hooks/useChangeTheme'

export const ThemeSelect = () => {
  const theme = useAuthStore(state => state.user.theme)

  const { mutate: changeUserTheme } = useChangeTheme()

  useEffect(() => {
    const root = window.document.documentElement

    root.className = theme

    return () => {
      root.className = DEFAULT_THEME
    }
  }, [theme])

  return (
    <Select.Root
      onValueChange={changeUserTheme}
      value={theme}>
      <Select.Trigger className='focus-visible:styled-outline flex items-center gap-1'>
        <Select.Value placeholder='Theme' />
        <Select.Icon asChild>
          <Icon
            name='chevron-down'
            className='size-5 stroke-black dark:stroke-white'
          />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          align='end'
          sideOffset={5}
          position='popper'
          className='fade-zoom w-[105px] rounded-lg border border-brand bg-white-soft pb-3.5 pl-4.5
            pr-11 pt-4.5 shadow-main violet:border-white-gray dark:bg-black-deep'>
          <Select.Viewport>
            {THEMES.map(theme => (
              <Select.Item
                key={theme}
                className='mb-1 cursor-pointer text-base outline-none data-[highlighted]:text-brand
                  data-[state=checked]:text-brand data-[highlighted]:underline
                  violet:data-[state=checked]:text-brand-violet hocus:text-brand
                  violet:hocus:text-brand-violet dark:text-white/30
                  dark:data-[state=checked]:text-brand dark:hocus:text-brand'
                value={theme}>
                <Select.ItemText>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  <Select.ItemIndicator />
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
