import type { Theme } from '@/shared/constants'

import { useEffect } from 'react'

import { DEFAULT_THEME, THEMES } from '@/shared/constants'
import { useAuthStore } from '@/shared/store'
import {
  Icon,
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
  SelectViewport
} from '@/shared/ui'

import { useChangeTheme } from '../hooks/useChangeTheme'

export const ThemeSelect = () => {
  const {
    user: { theme }
  } = useAuthStore()

  const { mutate: changeUserTheme } = useChangeTheme()

  useEffect(() => {
    const root = window.document.documentElement

    root.className = theme

    return () => {
      root.className = DEFAULT_THEME
    }
  }, [theme])

  return (
    <Select
      onValueChange={v => changeUserTheme({ theme: v as Theme })}
      value={theme}>
      <SelectTrigger className='flex items-center gap-1'>
        <SelectValue placeholder='Theme' />
        <SelectIcon asChild>
          <Icon
            name='chevron-down'
            className='size-5 stroke-black dark:stroke-white'
          />
        </SelectIcon>
      </SelectTrigger>
      <SelectContent
        align='end'
        className='w-[105px] pr-11'>
        <SelectViewport className='flex flex-col gap-1'>
          {THEMES.map(theme => (
            <SelectItem
              key={theme}
              className='hocus:underline'
              value={theme}>
              <SelectItemText>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </SelectItemText>
            </SelectItem>
          ))}
        </SelectViewport>
      </SelectContent>
    </Select>
  )
}
