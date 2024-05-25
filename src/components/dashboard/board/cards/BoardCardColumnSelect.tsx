import type { Card } from 'types'

import * as Select from '@radix-ui/react-select'

import { useAppMutation, useGetBoardById } from 'hooks'

import { cardService } from 'services'

import { cn } from 'lib'

export const BoardCardColumnSelect = ({ card }: { card: Card }) => {
  const columns = useGetBoardById().data?.columns

  const filteredColumns = columns?.filter(column => column.id !== card.column)

  const { mutate } = useAppMutation<string>({
    mutationKey: ['changeCardColumn'],
    mutationFn: columnId =>
      cardService.changeCardColumn(card.column, card.id, columnId)
  })

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
        className='animation w-min rounded-lg border border-brand bg-white-primary p-[18px]
          shadow-select violet:border-white-gray-secondary dark:bg-black-fourth'>
        {filteredColumns?.map(column => (
          <Select.Item
            key={column.id}
            className={cn(
              'text-fs-14-lh-1.28-fw-400 text-black outline-none dark:text-white/30',
              filteredColumns.length > 1 && 'mb-2'
            )}
            value={column.id}>
            <Select.ItemText>
              <div className='flex gap-2'>
                <span className='w-20 truncate'>{column.title}</span>
                <svg className='size-4 stroke-black/50 dark:stroke-white/50'>
                  <use href='/icons.svg#icon-arrow'></use>
                </svg>
              </div>
            </Select.ItemText>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
