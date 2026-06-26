import type { Theme } from '@/shared/config'

import { THEMES } from '@/shared/config'
import {
  Icon,
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue
} from '@/shared/ui'

import { useChangeTheme } from '../api/useChangeTheme'
import { useThemeWithRootSync } from '../lib/useThemeWithRootSync'

export const ThemeSelect = () => {
  const { theme: currentTheme } = useThemeWithRootSync()

  const { mutate: changeUserTheme } = useChangeTheme()

  return (
    <Select
      onValueChange={v => changeUserTheme({ theme: v as Theme })}
      value={currentTheme}>
      <SelectTrigger className='flex items-center gap-1'>
        <SelectValue
          placeholder='Theme'
          className='first-letter:capitalize'
        />
        <SelectIcon
          render={
            <Icon
              name='chevron-down'
              className='size-5'
            />
          }
        />
      </SelectTrigger>
      <SelectContent
        align='end'
        className='flex w-26.25 flex-col gap-1'>
        {THEMES.map(theme => (
          <SelectItem
            key={theme}
            disabled={theme === currentTheme}
            className='data-disabled:cursor-not-allowed
              data-highlighted:underline'
            value={theme}>
            <SelectItemText className='first-letter:capitalize'>
              {theme}
            </SelectItemText>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
