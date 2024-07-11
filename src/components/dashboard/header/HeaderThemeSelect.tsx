import { useEffect } from 'react'
import * as Select from '@radix-ui/react-select'
import { useSelector } from 'react-redux'

import { useChangeTheme } from 'hooks/user'

import { selectUserTheme } from 'redux/user.slice'

import { themes } from 'constants/themes'

export const HeaderThemeSelect = () => {
  const theme = useSelector(selectUserTheme)

  const { mutate } = useChangeTheme()

  useEffect(() => {
    window.document.documentElement.className = theme
  }, [theme])

  return (
    <Select.Root
      onValueChange={mutate}
      value={theme}>
      <Select.Trigger className='flex items-center gap-1'>
        <Select.Value placeholder='Theme' />
        <Select.Icon>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='17'
            fill='none'>
            <path
              d='m4 6.5 4 4 4-4'
              className='stroke-black dark:stroke-white'
              stroke='#161616'
              strokeOpacity='.8'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
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
            {themes.map(theme => (
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
