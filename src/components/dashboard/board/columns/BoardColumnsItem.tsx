import type { Card, Column } from 'types/board.types'

import { useModal } from 'react-modal-state'
import { useSelector } from 'react-redux'
import { selectFilter } from 'redux/user.slice'

import { useDeleteColumn } from 'hooks/column/useDeleteColumn'

import { BoardCard } from '../cards/BoardCard'

const getVisibleCards = (cards: Card[], filter: string) => {
  if (!filter) return cards

  return cards.filter(card => card.priority === filter)
}

export const BoardColumnsItem = ({ column }: { column: Column }) => {
  const filter = useSelector(selectFilter)

  const filteredCards = getVisibleCards(column.cards, filter)

  const { mutate } = useDeleteColumn(column._id)

  const { open } = useModal('edit-column-modal')

  return (
    <>
      <div
        className='mb-[14px] flex h-[56px] min-w-[335px] rounded-lg bg-white px-5 py-[18px]
          dark:bg-black'>
        <h3 className='text-black dark:text-white'>{column.title}</h3>
        <div className='ml-auto flex gap-2'>
          <button
            onClick={() => {
              localStorage.setItem('columnId', column._id)
              localStorage.setItem('column-title', column.title)
              open()
            }}>
            <svg
              className='size-[16px] stroke-black/50 transition duration-300 ease-in-out
                hocus:stroke-black dark:stroke-white/50 dark:hocus:stroke-white'>
              <use xlinkHref='/assets/icons.svg#icon-pencil-btn'></use>
            </svg>
          </button>
          <button onClick={() => mutate()}>
            <svg
              className='size-[16px] stroke-black/50 transition duration-300 ease-in-out
                hocus:stroke-black dark:stroke-white/50 dark:hocus:stroke-white'>
              <use xlinkHref='/assets/icons.svg#icon-trash-btn'></use>
            </svg>
          </button>
        </div>
      </div>
      {column?.cards?.length > 0 && (
        <div>
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

// {
//   column?.cards?.length > 0 && (
//     <div className='mb-[14px]'>
//       {!filter
//         ? column.cards.toReversed().map(card => (
//             <BoardCardsItem
//               key={card._id}
//               card={card}
//             />
//           ))
//         : column.cards
//             .toReversed()
//             .filter(card => card.priority === filter)
//             .map(card => (
//               <BoardCardsItem
//                 key={card._id}
//                 card={card}
//               />
//             ))}
//     </div>
//   )
// }
