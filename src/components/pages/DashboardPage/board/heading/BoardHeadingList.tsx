import { useSelector } from 'react-redux'
import { selectColumns } from 'redux/slices/board/board-slice'
import { BoardHeadingItem } from './BoardHeadingItem'

export const BoardHeadingList = () => {
  const columns = useSelector(selectColumns)

  return (
    <div className='mb-[14px] mt-[39px] flex tablet:mt-[26px] desktop:mt-[10px]'>
      {columns?.map(column => {
        return (
          <div key={column._id}>
            <BoardHeadingItem              
              column={column}
              key={column._id} />
            <Button 
              className=''
              isAddIcon
              iconName='plus'
              onClick={() => { open(), addIdToLocaleStorage(column._id) }}>
              Add another card
            </Button>
          </div>
        )
      })}
    </div>
  )
}
