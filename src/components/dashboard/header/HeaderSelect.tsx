import * as Select from '@radix-ui/react-select'

import { themes } from 'constants/themes'

type HeaderSelectProps = {
  theme: string
  handleThemeChange: (e: string) => void
}

export const HeaderSelect = ({
  theme,
  handleThemeChange
}: HeaderSelectProps) => (
  <Select.Root
    onValueChange={handleThemeChange}
    defaultValue={theme}>
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
        position='popper'
        className='z-10 w-[100px] rounded-lg border border-brand bg-white-primary pb-default
          pl-[18px] pr-11 pt-[18px] shadow-select data-[state=open]:animate-in
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0
          data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95
          data-[state=open]:zoom-in-95 violet:border-white-gray-secondary
          dark:bg-black-fourth'>
        {themes.map(theme => (
          <Select.Item
            key={theme}
            className='mb-1 cursor-pointer text-fs-14-lh-1.28-fw-400 text-black outline-none
              data-[state=checked]:text-brand hocus:text-brand
              violet:data-[state=checked]:text-brand-secondary
              violet:hocus:text-brand-secondary dark:text-white/30
              dark:data-[state=checked]:text-brand dark:hocus:text-brand'
            value={theme}>
            <Select.ItemText>
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </Select.ItemText>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Portal>
  </Select.Root>
)
