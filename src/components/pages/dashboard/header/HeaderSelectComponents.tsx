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
    className='z-10 w-[100px] rounded-lg border border-brand 
    bg-white-primary py-[18px] pl-[18px] pr-11 violet:border-white-gray-secondary dark:bg-black-fourth'
    position='popper'>
    {items.map(({ value, text }) => (
      <Item
        key={value}
        className='mb-1 cursor-pointer text-fs-14-lh-1.28-fw-400 text-black outline-none 
        data-[state=checked]:text-brand violet:data-[state=checked]:text-brand-secondary
         dark:text-white/30 dark:data-[state=checked]:text-brand'
        value={value}>
        <ItemText>{text}</ItemText>
      </Item>
    ))}
  </Content>
)

export { Select, SelectContent, SelectTrigger }
