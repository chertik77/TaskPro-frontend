import type { Card } from 'types'

import * as Select from '@radix-ui/react-select'

import { useGetBoardById } from 'hooks'
import { useChangeCardColumn } from 'hooks/column'

import { cn } from 'lib'

export const BoardCardColumnSelect = ({ card }: { card: Card }) => {
  const columns = useGetBoardById().data?.columns

  const filteredColumns = columns?.filter(column => column.id !== card.column)

  const { mutate } = useChangeCardColumn(card.id)

  return (
    <Select.Root
      onValueChange={mutate}
      disabled={columns && columns.length <= 1}>
      <Select.Trigger className='disabled:hidden'>
        <svg
          className='size-4 stroke-black/50 hocus:stroke-black dark:stroke-white/50
            dark:hocus:stroke-white'>
          <use href='/icons.svg#icon-arrow'></use>
        </svg>
      </Select.Trigger>
      <Select.Content
        position='popper'
        className='animation w-min rounded-lg border border-brand bg-white-primary p-lg
          shadow-select violet:border-white-gray-secondary dark:bg-black-fourth'>
        <Select.Viewport>
          {filteredColumns?.map(column => (
            <Select.Item
              key={column.id}
              className={cn(
                `group cursor-pointer text-base outline-none data-[highlighted]:text-brand
                hocus:text-brand violet:hocus:text-brand-secondary dark:text-white/30
                dark:hocus:text-brand`,
                filteredColumns.length > 1 && 'space-y-2'
              )}
              value={column.id}>
              <Select.ItemText>
                <div className='flex gap-2'>
                  <span className='w-20 truncate'>{column.title}</span>
                  <svg
                    className='size-4 stroke-black/50 group-focus:stroke-brand
                      violet:group-focus:stroke-brand-secondary dark:stroke-white/50'>
                    <use href='/icons.svg#icon-arrow'></use>
                  </svg>
                </div>
              </Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  )
}
