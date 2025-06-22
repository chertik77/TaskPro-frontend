import type { CardTypes } from '@/entities/card'

import { cn, useDndSortable } from '@/shared/lib'

import { MemoizedCard } from './MemoizedCard'

type CardListItemProps = {
  card: CardTypes.CardSchema
  isOverlay?: boolean
}

export const CardListItem = ({ card, isOverlay }: CardListItemProps) => {
  const { setNodeRef, listeners, attributes, style, isDragging } =
    useDndSortable({
      id: card.id,
      data: { type: 'card', card },
      attributes: { roleDescription: `Card: ${card.title}` }
    })

  return (
    <li
      className={cn(
        'touch-manipulation list-none rounded-lg',
        isOverlay && 'styled-outline',
        isDragging && 'opacity-60 select-none'
      )}
      ref={setNodeRef}
      style={style}>
      <MemoizedCard
        card={card}
        listeners={listeners}
        attributes={attributes}
      />
    </li>
  )
}
