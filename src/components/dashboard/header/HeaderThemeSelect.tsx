import { Icon, Item, ItemText, Value } from '@radix-ui/react-select'
import { useTheme } from 'next-themes'
import { FaChevronDown } from 'react-icons/fa'
import { updateUser } from 'redux/user.slice'

import { Select } from 'components/ui/Select'

import { useAppDispatch } from 'hooks'
import { useUpdateUser } from 'hooks/user/useUpdateUser'

import themeItems from 'lib/json/theme-items.json'

export const HeaderThemeSelect = () => {
  const dispatch = useAppDispatch()

  const { setTheme, theme } = useTheme()

  const { mutateAsync } = useUpdateUser()

  const handleThemeChange = (e: string) => {
    setTheme(e)
    mutateAsync(e).then(r => dispatch(updateUser(r.user)))
  }

  return (
    <Select
      onValueChange={handleThemeChange}
      defaultValue={theme}>
      <Select.Trigger className='flex items-center gap-1 bg-transparent focus:outline-none'>
        <Value placeholder='Theme' />
        <Icon>
          <FaChevronDown />
        </Icon>
      </Select.Trigger>
      <Select.Content
        className='z-10 w-[100px] rounded-lg border border-brand bg-white-primary pb-[14px]
          pl-[18px] pr-11 pt-[18px] violet:border-white-gray-secondary
          dark:bg-black-fourth'>
        {themeItems.map(({ value, text }) => (
          <Item
            key={value}
            className='mb-1 cursor-pointer text-fs-14-lh-1.28-fw-400 text-black outline-none
              data-[state=checked]:text-brand violet:data-[state=checked]:text-brand-secondary
              dark:text-white/30 dark:data-[state=checked]:text-brand'
            value={value}>
            <ItemText>
              <button className='hocus:text-brand violet:hocus:text-brand-secondary'>
                {text}
              </button>
            </ItemText>
          </Item>
        ))}
      </Select.Content>
    </Select>
  )
}
