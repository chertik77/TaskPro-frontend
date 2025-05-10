import type { Theme } from '@/shared/constants'

import { useEffect } from 'react'
import * as Select from '@radix-ui/react-select'

import { DEFAULT_THEME, THEMES } from '@/shared/constants'
import { useAuthStore } from '@/shared/store'
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
      onValueChange={v => changeUserTheme({ theme: v as Theme })}
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
          className='fade-zoom border-brand bg-white-soft shadow-main violet:border-white-gray
            dark:bg-black-deep w-[105px] rounded-lg border pt-4.5 pr-11 pb-3.5 pl-4.5'>
          <Select.Viewport>
            {THEMES.map(theme => (
              <Select.Item
                key={theme}
                className='data-[highlighted]:text-brand data-[state=checked]:text-brand
                  violet:data-[state=checked]:text-brand-violet hocus:text-brand
                  violet:hocus:text-brand-violet dark:data-[state=checked]:text-brand
                  dark:hocus:text-brand mb-1 cursor-pointer text-base outline-none
                  data-[highlighted]:underline dark:text-white/30'
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
