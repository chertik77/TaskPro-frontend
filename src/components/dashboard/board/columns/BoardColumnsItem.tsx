import type { Column } from 'types/board.types'

import { useModal } from 'react-modal-state'
import { useSelector } from 'react-redux'
import { selectFilter } from 'redux/user.slice'

import { Button } from 'components/ui/Button'

import { useDeleteColumn } from 'hooks/column/useDeleteColumn'

import { getVisibleCards } from 'lib'

import { BoardCard } from '../cards/BoardCard'

export const BoardColumnsItem = ({ column }: { column: Column }) => {
  const filter = useSelector(selectFilter)

  const filteredCards = getVisibleCards(column.cards, filter)

  const { mutate } = useDeleteColumn(column._id)

  const { open } = useModal('edit-column-modal')

  return (
    <>
      <div
        className='mb-default flex h-[56px] min-w-[335px] rounded-lg bg-white px-5 py-[18px]
          dark:bg-black'>
        <h3 className='text-black dark:text-white'>{column.title}</h3>
        <div className='ml-auto flex gap-2'>
          <Button
            onClick={() => {
              open({ columnId: column._id, columnTitle: column.title })
            }}
            iconName='pencil'
          />
          <Button
            onClick={() => mutate()}
            iconName='trash'
          />
        </div>
      </div>
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
