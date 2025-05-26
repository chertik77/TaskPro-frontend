import { memo } from 'react'

import {
  Icon,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectViewport
} from '@/shared/ui'

import { useGetFilteredColumns } from '../hooks/useGetFilteredColumns'
import { useMoveCard } from '../hooks/useMoveCard'

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
                className='group flex items-center gap-2'
                value={column.id}>
                <p className='group-focus:text-brand violet:group-focus:text-brand-violet w-20 truncate'>
                  {column.title}
                </p>
                <Icon
                  name='arrow-circle'
                  className='group-focus:stroke-brand violet:group-focus:stroke-brand-violet size-4
                    stroke-black dark:stroke-white/50'
                />
              </SelectItem>
            ))}
          </SelectViewport>
        </SelectContent>
      </Select>
    )
  }
)
