import type { CardTypes } from '@/entities/card'

import { memo } from 'react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { useFilteredCards } from '@/features/card/filter-cards'

import { Draggable, useDragAndDrop } from '@/entities/dnd'

import { cn } from '@/shared/lib/cn'

import { CardDraggingState, CardListItem } from './CardListItem'

type CardListProps = {
  cards: CardTypes.Card[] | undefined
}

export const CardList = memo(({ cards }: CardListProps) => {
  const { cards: allCards } = useDragAndDrop()

  const filteredCards = useFilteredCards(cards!)

  return (
    <SortableContext
      items={allCards || []}
      strategy={verticalListSortingStrategy}>
      <ul className='space-y-2'>
        {filteredCards?.map(card => (
          <Draggable
            entity={card}
            key={card.id}
            draggableType='card'
            WhileDraggingComponent={CardDraggingState}>
            {({ setNodeRef, style, attributes, listeners, isDragging }) => (
              <li
                className={cn(
                  'cursor-grab touch-manipulation focus-visible:outline-none',
                  isDragging && 'select-none'
                )}
                {...listeners}
                {...attributes}
                ref={setNodeRef}
                style={style}>
                <CardListItem card={card} />
              </li>
            )}
          </Draggable>
        ))}
      </ul>
    </SortableContext>
  )
})
