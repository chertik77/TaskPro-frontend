import type { Board } from 'types/board.types'

import { useModal } from 'react-modal-state'

import { Button } from 'components/ui'

import { BoardHeadingItem } from './BoardHeadingItem'

type BoardHeadingListProps = {
  columns: Board['columns'] | undefined
}

export const BoardHeadingList = ({ columns }: BoardHeadingListProps) => {
  const { open } = useModal('add-card-modal')

  return (
    <div className='mb-[14px] mt-[39px] flex tablet:mt-[26px] desktop:mt-[10px]'>
      {columns?.map(column => (
        <div
          key={column._id}
          className='mr-[34px] w-[334px]'>
          <BoardHeadingItem column={column} />
          <Button
            isAddIcon
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
