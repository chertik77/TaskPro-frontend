import { memo } from 'react'

import {
  Icon,
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

    const { mutate: moveCard } = useMoveCard()

    return (
      <Select
        value={cardColumnId}
        onValueChange={v => moveCard({ cardId: cardId, newColumnId: v })}
        disabled={columns && columns.length <= 1}>
        <SelectTrigger className='group disabled:hidden'>
          <Icon
            name='arrow-circle'
            className='group-hocus:stroke-black dark:group-hocus:stroke-white size-4 stroke-black/50
              dark:stroke-white/50'
          />
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
                  className='size-4 stroke-current'
                />
              </SelectItem>
            ))}
          </SelectViewport>
        </SelectContent>
      </Select>
    )
  }
)
