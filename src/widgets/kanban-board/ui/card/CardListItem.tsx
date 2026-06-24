import type { CardTypes } from '@/entities/card'
import type { KeyboardEvent } from 'react'

import { useState } from 'react'

import { cn, useDndSortable } from '@/shared/lib'

import { MemoizedCard } from './MemoizedCard'

type CardListItemProps = {
  card: CardTypes.CardSchema
  isOverlay?: boolean
}

export const CardListItem = ({ card, isOverlay }: CardListItemProps) => {
  const [isInteracting, setIsInteracting] = useState(false)

  const { setNodeRef, listeners, attributes, style, isDragging } =
    useDndSortable({
      id: card.id,
      data: { type: 'card', card },
      attributes: { roleDescription: `Card: ${card.title}` },
      disabled: isInteracting
    })

  const handleKeyDownCapture = (e: KeyboardEvent) => {
    if (!(e.target instanceof HTMLLIElement)) setIsInteracting(true)
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
      onKeyDownCapture={handleKeyDownCapture}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}>
      <MemoizedCard card={card} />
    </li>
  )
}
