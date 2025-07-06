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
        `violet:focus-visible:[&>div]:shadow-[inset_0_0px_10px_#7b7ede]
        disable-text-selection cursor-grab touch-manipulation list-none
        rounded-lg transition-shadow focus-visible:outline-none
        focus-visible:[&>div]:shadow-[inset_0_0px_10px_#9dc888]`,
        isOverlay && 'styled-outline',
        isDragging && 'opacity-60'
      )}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}>
      <MemoizedCard card={card} />
    </li>
  )
}
