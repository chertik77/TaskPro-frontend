import type { Column } from 'types'

import { useSelector } from 'react-redux'

import { selectFilter } from 'redux/user.slice'

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
        <div className='space-y-[8px]'>
          {filteredCards.map(card => (
            <BoardCard
              key={card._id}
              card={card}
            />
          ))}
        </div>
      )}
    </>
  )
}
