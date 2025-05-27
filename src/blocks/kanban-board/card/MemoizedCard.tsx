import type { CardTypes } from '@/entities/card'
import type { DraggableAttributes } from '@dnd-kit/core'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'

import { memo } from 'react'

import { DeleteCardTrigger } from '@/features/card/delete-card'
import { EditCardDialog } from '@/features/card/edit-card'
import { MoveCardSelect } from '@/features/card/move-card'

import { Card } from '@/entities/card'

type MemoizedCardProps = {
  card: CardTypes.CardSchema
  attributes: DraggableAttributes
  listeners: SyntheticListenerMap | undefined
}

export const MemoizedCard = memo(
  ({ card, listeners, attributes }: MemoizedCardProps) => (
    <Card card={card}>
      <Card.DragActivator
        className='absolute top-3 right-3'
        listeners={listeners}
        attributes={attributes}
      />
      <Card.PriorityIndicator />
      <Card.Title />
      <Card.Description />
      <div className='flex items-end border-t border-black/10 pt-3.5 dark:border-white/10'>
        <Card.Priority />
        <Card.Deadline />
        <div className='ml-auto flex items-center gap-3'>
          <Card.DeadlineTodayIndicator />
          <div className='flex items-center gap-2'>
            <MoveCardSelect
              cardId={card.id}
              cardColumnId={card.columnId}
            />
            <EditCardDialog data={card} />
            <DeleteCardTrigger cardId={card.id} />
          </div>
        </div>
      </div>
    </Card>
  )
)
