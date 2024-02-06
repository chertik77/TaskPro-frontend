import {
  Content,
  Icon,
  Item,
  ItemText,
  Root,
  Trigger,
  Value
} from '@radix-ui/react-select'
import items from 'lib/json/theme-items.json'
import { FaChevronDown } from 'react-icons/fa'

const Select = Root

const SelectTrigger = () => (
  <Trigger className='flex items-center gap-1 bg-transparent focus:outline-none'>
    <Value placeholder='Theme' />
    <Icon>
      <FaChevronDown />
    </Icon>
  </Trigger>
)

const SelectContent = () => (
  <Content
    className='w-[100px] rounded-lg border border-brand bg-white-primary 
    py-[18px] pl-[18px] pr-11 dark:bg-black-fourth violet:border-white-gray-secondary'
    position='popper'>
    {items.map(({ value, text }) => (
      <Item
        className='text-fs-14-lh-1.28-fw-400 text-black dark:text-white/30 outline-none cursor-pointer 
        mb-1 data-[state=checked]:text-brand dark:data-[state=checked]:text-brand violet:data-[state=checked]:text-brand-secondary'
        value={value}>
        <ItemText>{text}</ItemText>
      </Item>
    ))}
  </Content>
)

export { Select, SelectContent, SelectTrigger }
