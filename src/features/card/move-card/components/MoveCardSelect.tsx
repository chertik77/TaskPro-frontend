import { memo, useMemo } from 'react'
import * as Select from '@radix-ui/react-select'

import { useGetBoardById } from '@/shared/hooks'
import { Icon } from '@/shared/ui'

import { useMoveCard } from '../hooks/useMoveCard'

type MoveCardSelectProps = {
  cardId: string
  cardColumnId: string
}

export const MoveCardSelect = memo(
  ({ cardId, cardColumnId }: MoveCardSelectProps) => {
    const { data: columns } = useGetBoardById({
      select: board => board.columns,
      refetchOnMount: false
    })

    const filteredColumns = useMemo(
      () => columns?.filter(c => c.id !== cardColumnId),
      [columns, cardColumnId]
    )

    const { mutate: moveCard } = useMoveCard()

    return (
      <Select.Root
        value={cardColumnId}
        onValueChange={v => moveCard({ cardId: cardId, newColumnId: v })}
        disabled={columns && columns.length <= 1}>
        <Select.Trigger className='group focus-visible:styled-outline disabled:hidden'>
          <Icon
            name='arrow-circle'
            className='group-hocus:stroke-black dark:group-hocus:stroke-white size-4 stroke-black/50
              dark:stroke-white/50'
          />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            sideOffset={10}
            position='popper'
            className='fade-zoom border-brand bg-white-soft shadow-main violet:border-white-gray
              dark:bg-black-deep w-min rounded-lg border p-4.5'>
            <Select.Viewport className='flex flex-col gap-2'>
              {filteredColumns?.map(column => (
                <Select.Item
                  key={column.id}
                  className='group data-[highlighted]:text-brand hocus:text-brand
                    violet:hocus:text-brand-violet violet:data-[highlighted]:text-brand-violet flex
                    cursor-pointer items-center gap-2 text-base outline-none dark:text-white/30'
                  value={column.id}>
                  <p className='w-20 truncate'>{column.title}</p>
                  <Icon
                    name='arrow-circle'
                    className='group-focus:stroke-brand violet:group-focus:stroke-brand-violet size-4
                      stroke-black dark:stroke-white/50'
                  />
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    )
  }
)
