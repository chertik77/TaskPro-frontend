import { useEffect } from 'react'
import * as Select from '@radix-ui/react-select'

import { selectUserTheme } from 'features/user/user.slice'

import { Icon } from 'components/ui'
import { useAppSelector } from 'hooks/redux'

import { useChangeTheme } from '../hooks'
import { DEFAULT_THEME, THEMES } from '../user.constants'

export const ThemeSelect = () => {
  const theme = useAppSelector(selectUserTheme)

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
          className='animation w-[105px] rounded-lg border border-brand bg-white-primary pb-3.5 pl-lg
            pr-11 pt-lg shadow-select violet:border-white-gray-secondary
            dark:bg-black-fourth'>
          <Select.Viewport>
            {THEMES.map(theme => (
              <Select.Item
                key={theme}
                className='mb-1 cursor-pointer text-base outline-none data-[highlighted]:text-brand
                  data-[state=checked]:text-brand data-[highlighted]:underline hocus:text-brand
                  violet:data-[state=checked]:text-brand-secondary
                  violet:hocus:text-brand-secondary dark:text-white/30
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
