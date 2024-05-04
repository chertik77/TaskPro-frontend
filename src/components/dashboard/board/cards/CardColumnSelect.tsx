import type { Card } from 'types/board.types'

import { Item, ItemText } from '@radix-ui/react-select'

import { Select } from 'components/ui/Select'

import { useGetBoardById } from 'hooks/board/useGetBoardById'
import { useChangeCardColumn } from 'hooks/card/useChangeCardColumn'

export const CardColumnSelect = ({ card }: { card: Card }) => {
  const columns = useGetBoardById(card.board).data?.columns

  const filteredColumns = columns?.filter(column => column._id !== card.column)

  const { mutate } = useChangeCardColumn(card)

  return (
    <Select
      onValueChange={mutate}
      disabled={columns && columns.length <= 1}>
      <Select.Trigger className='flex items-center gap-1 bg-transparent focus:outline-none disabled:hidden'>
        <svg
          className='size-[16px] stroke-black/50 transition duration-300 ease-in-out
            hocus:stroke-black dark:stroke-white/50 dark:hocus:stroke-white'>
          <use xlinkHref='/assets/icons.svg#icon-arrow-btn'></use>
        </svg>
      </Select.Trigger>
      <Select.Content
        className='w-min rounded-lg border border-brand bg-white-primary p-[18px]
          violet:border-white-gray-secondary dark:bg-black-fourth'>
        {filteredColumns?.map(column => (
          <Item
            key={column._id}
            className='svg-[state=checked]:stroke-brand mb-1 cursor-pointer text-fs-14-lh-1.28-fw-400
              text-black outline-none data-[state=checked]:text-brand
              violet:data-[state=checked]:text-brand-secondary dark:text-white/30
              dark:data-[state=checked]:text-brand'
            value={column._id}>
            <ItemText>
              <div className='flex items-center justify-between gap-2'>
                <span className='w-16 truncate'>{column.title}</span>
                <svg className='inline-block size-[16px] stroke-black/50 dark:stroke-white/50'>
                  <use xlinkHref='/assets/icons.svg#icon-arrow-btn'></use>
                </svg>
              </div>
            </ItemText>
          </Item>
        ))}
      </Select.Content>
    </Select>
  )
}
