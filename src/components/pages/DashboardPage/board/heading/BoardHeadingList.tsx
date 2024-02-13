import { Button } from 'components/ui'
import { useModal } from 'react-modal-state'
import { useSelector } from 'react-redux'
import { selectColumns } from 'redux/slices/board/board-slice'
import { BoardHeadingItem } from './BoardHeadingItem'

export const BoardHeadingList = () => {
  const columns = useSelector(selectColumns)
  const { open } = useModal('add-card-modal')

  return (
    <div className='mb-[14px] mt-[39px] flex tablet:mt-[26px] desktop:mt-[10px]'>
      {columns?.map(column => {
        return (
          <div key={column._id}>
            <BoardHeadingItem column={column} />
            <Button
              isAddIcon
              iconName='plus'
              onClick={() => {
                localStorage.setItem('columnId', column._id)
                open()
              }}>
              Add another card
            </Button>
          </div>
        )
      })}
    </div>
  )
}
