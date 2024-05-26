import type { Column } from 'types'

import { Draggable } from '@hello-pangea/dnd'
import { useSelector } from 'react-redux'

import { selectFilters } from 'redux/filter.slice'

import { cn, getVisibleCards } from 'lib'

import { BoardCard } from '../cards/BoardCard'
import { BoardColumnsActions } from './BoardColumnsActions'

export const BoardColumnsItem = ({ column }: { column: Column }) => {
  const filters = useSelector(selectFilters)

  const filteredCards = getVisibleCards(column.cards, filters)

  return (
    <>
      <BoardColumnsActions column={column} />
      {column?.cards?.length > 0 && (
        <div
          className={cn(
            'custom-scrollbar -mr-4 space-y-2 overflow-y-auto pr-4',
            column.cards.length > 3 &&
              !filters.priorityFilter &&
              'h-[calc(100dvh-300px)] tablet:h-[calc(100dvh-280px)]'
          )}>
          {filteredCards.map((card, i) => (
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
