import type { Board } from 'types'

import { useModal } from 'react-modal-state'

import { Button } from 'components/ui'

import { BoardColumnsItem } from './BoardColumnsItem'

type BoardColumnsListProps = {
  columns: Board['columns'] | undefined
}

export const BoardColumnsList = ({ columns }: BoardColumnsListProps) => {
  const { open } = useModal('add-card-modal')

  return (
    <div className='flex'>
      {columns?.map(column => (
        <div
          key={column._id}
          className='mr-[34px]'>
          <BoardColumnsItem column={column} />
          <Button
            isPlusIcon
            className='mt-default'
            onClick={() => open(column._id)}>
            Add another card
          </Button>
        </div>
      ))}
    </div>
  )
}
