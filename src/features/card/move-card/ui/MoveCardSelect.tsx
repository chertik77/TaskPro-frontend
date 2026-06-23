import { memo } from 'react'

import { cn } from '@/shared/lib'
import {
  Icon,
  Loader,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectViewport
} from '@/shared/ui'

import { useMoveCard } from '../api/useMoveCard'
import { useGetFilteredColumns } from '../lib/useGetFilteredColumns'

type MoveCardSelectProps = {
  cardId: string
  cardColumnId: string
}

export const MoveCardSelect = memo(
  ({ cardId, cardColumnId }: MoveCardSelectProps) => {
    const { columns, filteredColumns } = useGetFilteredColumns(cardColumnId)

    const { mutate: moveCard, isPending } = useMoveCard()

    return (
      <Select
        value={cardColumnId}
        onValueChange={v => moveCard({ cardId: cardId, columnId: v })}
        disabled={isPending}>
        <SelectTrigger
          className={cn(
            `hocus:text-black dark:hocus:text-white text-black/50
            dark:text-white/50`,
            columns && columns.length <= 1 && 'hidden'
          )}>
          {isPending ? (
            <Loader className='flex size-4 border-2' />
          ) : (
            <Icon
              name='arrow-circle'
              className='size-4'
            />
          )}
        </SelectTrigger>
        <SelectContent
          sideOffset={10}
          className='w-min'>
          <SelectViewport className='flex flex-col gap-2'>
            {filteredColumns?.map(column => (
              <SelectItem
                key={column.id}
                className='flex items-center gap-2'
                value={column.id}>
                <p className='w-20 truncate'>{column.title}</p>
                <Icon
                  name='arrow-circle'
                  className='size-4'
                />
              </SelectItem>
            ))}
          </SelectViewport>
        </SelectContent>
      </Select>
    )
  }
)
