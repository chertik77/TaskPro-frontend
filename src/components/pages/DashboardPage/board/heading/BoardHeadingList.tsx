import { Button } from 'components/ui'
import { Column } from 'redux/slices/board/board-types'
import { BoardHeadingItem } from './BoardHeadingItem'

export const BoardHeadingList = ({ columns }: { columns?: Column[] }) => {
  return (
    <div className='mb-[14px] mt-[39px] flex gap-[34px] overflow-x-auto tablet:mt-[26px] desktop:mt-[10px]'>
      {columns?.map(column => {
        return (
          <>
            <BoardHeadingItem column={column} key={column._id} />
            <Button isAddIcon iconName='plus'>
              Add another card
            </Button>
          </>
        )
      })}
    </div>
  )
}
