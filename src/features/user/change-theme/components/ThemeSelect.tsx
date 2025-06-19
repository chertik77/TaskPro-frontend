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
  SelectValue,
  SelectViewport
} from '@/shared/ui'

import { useChangeTheme } from '../hooks/useChangeTheme'
import { useThemeWithRootSync } from '../hooks/useThemeWithRootSync'

export const ThemeSelect = () => {
  const { theme: currentTheme } = useThemeWithRootSync()

  const { mutate: changeUserTheme } = useChangeTheme()

  return (
    <Select
      onValueChange={(v: Theme) => changeUserTheme({ theme: v })}
      value={currentTheme}>
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
        className='w-[105px]'>
        <SelectViewport className='flex flex-col gap-1'>
          {THEMES.map(theme => (
            <SelectItem
              key={theme}
              disabled={theme === currentTheme}
              className='data-disabled:cursor-not-allowed data-[highlighted]:underline'
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
