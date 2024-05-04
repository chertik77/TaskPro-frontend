import type { Board } from 'types/board.types'

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
          className='mr-[34px] w-[334px]'>
          <BoardColumnsItem column={column} />
          <Button
            isAddIcon
            className='mt-[14px]'
            iconName='plus'
            onClick={() => open(column._id)}>
            <span className='text-fs-14-lh-normal-fw-500'>
              Add another card
            </span>
          </Button>
        </div>
      ))}
    </div>
  )
}
