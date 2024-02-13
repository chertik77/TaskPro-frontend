import { useSelector } from 'react-redux'
import { selectColumns } from 'redux/slices/board/board-slice'
import { BoardHeadingItem } from './BoardHeadingItem'

export const BoardHeadingList = () => {
  const columns = useSelector(selectColumns)

  return (
    <div className='mb-[14px] mt-[39px] flex gap-[34px] overflow-x-auto tablet:mt-[26px] desktop:mt-[10px]'>
      {columns?.map(column => {
        return <BoardHeadingItem column={column} key={column._id} />
      })}
    </div>
  )
}
