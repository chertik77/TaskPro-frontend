import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetAllBoardsQuery } from 'redux/api/dashboard/board'
import { selectBoard } from 'redux/slices/board/board-slice'
import { SideBarBoardsItem } from './SideBarBoardsItem'

export const SidebarBoardsList = () => {
  const board = useSelector(selectBoard)
  const { data, refetch } = useGetAllBoardsQuery(undefined)

  useEffect(() => {
    refetch()
  }, [board])

  return (
    <div className='mb-auto'>
      {data?.data.map(({ _id, title }) => <div key={_id}>{title}</div>)}
      <ul className=''>
        <SideBarBoardsItem />
      </ul>
    </div>
  )
}
