import type { Theme } from '@/shared/constants'

import { THEMES } from '@/shared/constants'
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
  const { theme } = useThemeWithRootSync()

  const { mutate: changeUserTheme } = useChangeTheme()

  return (
    <Select
      onValueChange={(v: Theme) => changeUserTheme({ theme: v })}
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
