import type { CardTypes } from '@/entities/card'

import { DeleteCardTrigger } from '@/features/card/delete-card'
import { EditCardModalTrigger } from '@/features/card/edit-card'

import { Card } from '@/entities/card'

import { useKanbanSortable } from '@/shared/hooks'
import { cn } from '@/shared/lib/cn'

type CardListItemProps = {
  card: CardTypes.CardSchema
  isOverlay?: boolean
}

export const CardListItem = ({ card, isOverlay }: CardListItemProps) => {
  const { setNodeRef, listeners, attributes, style, isDragging } =
    useKanbanSortable({
      id: card.id,
      data: { type: 'card', card },
      attributes: { roleDescription: `Card: ${card.title}` }
    })

  return (
    <li
      className={cn(
        'list-none rounded-lg transition-all',
        isOverlay && 'styled-outline',
        isDragging && 'opacity-60 select-none'
      )}
      ref={setNodeRef}
      style={style}>
      <Card card={card}>
        <Card.DragActivator
          className='absolute top-4 right-4'
          listeners={listeners}
          attributes={attributes}
        />
        <Card.PriorityIndicator />
        <Card.Title />
        <Card.Description />
        <div className='flex items-end border-t border-black/10 pt-3.5 dark:border-white/10'>
          <Card.Priority />
          <Card.Deadline />
          <div className='ml-auto flex gap-2'>
            <Card.DeadlineTodayIndicator />
            <EditCardModalTrigger card={card} />
            <DeleteCardTrigger cardId={card.id} />
          </div>
        </div>
      </Card>
    </li>
  )
}
