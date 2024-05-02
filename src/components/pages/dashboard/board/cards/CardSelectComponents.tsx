import type { Card } from 'redux/slices/board/board-types'

import { Content, Item, ItemText, Root, Trigger } from '@radix-ui/react-select'
import { useSelector } from 'react-redux'
import { selectColumns } from 'redux/slices/board/board-slice'

export const Select = Root

export const SelectTrigger = () => (
  <Trigger className='flex items-center gap-1 bg-transparent focus:outline-none'>
    <svg
      className='size-[16px] stroke-black/50 transition duration-300 ease-in-out
        hocus:stroke-black dark:stroke-white/50 dark:hocus:stroke-white'>
      <use xlinkHref='/assets/icons.svg#icon-arrow-btn'></use>
    </svg>
  </Trigger>
)

export const SelectContent = ({ card }: { card: Card }) => {
  const columns = useSelector(selectColumns)
  const filteredColumns = columns.filter(column => column._id !== card.column)

  return (
    <Content
      className='min-w-[135px] rounded-lg border border-brand bg-white-primary p-[18px]
        violet:border-white-gray-secondary dark:bg-black-fourth'
      position='popper'>
      {filteredColumns?.map(column => (
        <Item
          key={column._id}
          className='svg-[state=checked]:stroke-brand mb-1 cursor-pointer text-fs-14-lh-1.28-fw-400
            text-black outline-none data-[state=checked]:text-brand
            violet:data-[state=checked]:text-brand-secondary dark:text-white/30
            dark:data-[state=checked]:text-brand'
          value={column._id}>
          <ItemText>
            <div className='flex justify-between'>
              <span>{column.title}</span>
              <svg className='inline-block size-[16px] stroke-black/50 dark:stroke-white/50'>
                <use xlinkHref='/assets/icons.svg#icon-arrow-btn'></use>
              </svg>
            </div>
          </ItemText>
        </Item>
      ))}
    </Content>
  )
}
