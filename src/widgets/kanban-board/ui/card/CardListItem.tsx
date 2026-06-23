import type { CardTypes } from '@/entities/card'
import type { KeyboardEvent } from 'react'

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

  const handleOnKeyDownCapture = (e: KeyboardEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement

    // Prevents dnd kit to trigger keyboard navigation on card modal inputs
    if (target.closest('input, textarea, select, button')) {
      e.stopPropagation()
    }
  }

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
      onKeyDownCapture={handleOnKeyDownCapture}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}>
      <MemoizedCard card={card} />
    </li>
  )
}
