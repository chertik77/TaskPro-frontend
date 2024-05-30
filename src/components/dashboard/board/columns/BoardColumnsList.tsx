import type { Board } from 'types'

import { useModal } from 'react-modal-state'

import { AddCardModal } from 'components/dashboard/modals'
import { Button } from 'components/ui'

import { BoardColumnsItem } from './BoardColumnsItem'

type BoardColumnsListProps = {
  columns: Board['columns'] | undefined
}

export const BoardColumnsList = ({ columns }: BoardColumnsListProps) => {
  const { open } = useModal(AddCardModal)

  return (
    <div className='flex'>
      {columns?.map(column => (
        <div
          key={column.id}
          className='mr-[34px]'>
          <BoardColumnsItem column={column} />
          <Button
            isPlusIcon
            className='mt-3.5'
            onClick={() => open(column.id)}>
            Add another card
          </Button>
        </div>
      ))}
    </div>
  )
}
