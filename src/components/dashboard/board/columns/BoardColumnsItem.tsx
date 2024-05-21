import type { Column } from 'types'

import { Draggable } from '@hello-pangea/dnd'
import { useSelector } from 'react-redux'

import { selectFilter } from 'redux/filter.slice'

import { getVisibleCards } from 'lib'

import { BoardCard } from '../cards/BoardCard'
import { BoardColumnsActions } from './BoardColumnsActions'

export const BoardColumnsItem = ({ column }: { column: Column }) => {
  const filter = useSelector(selectFilter)

  const filteredCards = getVisibleCards(column.cards, filter)

  return (
    <>
      <BoardColumnsActions column={column} />
      {column?.cards?.length > 0 && (
        <div className=''>
          <div className='h-[500px] space-y-[8px] overflow-auto'>
            {filteredCards.map((card, i) => (
              <Draggable
                index={i}
                key={card._id}
                draggableId={card._id}>
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
        </div>
      )}
    </>
  )
}
