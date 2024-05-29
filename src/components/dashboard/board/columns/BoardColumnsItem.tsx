import type { Column } from 'types'

import { Draggable } from '@hello-pangea/dnd'
import { useSelector } from 'react-redux'

import { selectCardPriority, selectCardSort } from 'redux/filter.slice'

import { cn, getFilteredCardsByPriority, getSortedCards } from 'lib'

import { BoardCard } from '../cards/BoardCard'
import { BoardColumnsActions } from './BoardColumnsActions'

export const BoardColumnsItem = ({ column }: { column: Column }) => {
  const cardPriority = useSelector(selectCardPriority)
  const cardSort = useSelector(selectCardSort)

  const filteredCards = getFilteredCardsByPriority(column.cards, cardPriority)

  const sortedCards = getSortedCards(filteredCards, cardSort)

  return (
    <>
      <BoardColumnsActions column={column} />
      {column?.cards?.length > 0 && (
        <div
          className={cn(
            'custom-scrollbar -mr-4 space-y-2 overflow-y-auto pr-4',
            column.cards.length > 3 &&
              !cardPriority &&
              'h-[calc(100dvh-300px)] tablet:h-[calc(100dvh-280px)]'
          )}>
          {sortedCards?.map((card, i) => (
            <Draggable
              index={i}
              key={card.id}
              draggableId={card.id}>
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                  <BoardCard card={card} />
                </div>
              )}
            </Draggable>
          ))}
        </div>
      )}
    </>
  )
}
