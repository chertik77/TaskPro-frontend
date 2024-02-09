import { Button } from 'components/ui'
import { useAppDispatch } from 'hooks'
import { useEffect, useState } from 'react'
import { useModal } from 'react-modal-state'
import { useParams } from 'react-router-dom'
import { boardApi } from 'redux/api/dashboard/board'
import { Board as BoardT } from 'redux/slices/board/board-types'

export const Board = () => {
  const { name } = useParams()
  const dispatch = useAppDispatch()
  const { open } = useModal('add-column-modal')
  const [boardData, setBoardData] = useState<BoardT | null>(null)

  useEffect(() => {
    if (name) {
      dispatch(boardApi.endpoints.getBoardByName.initiate(name.slice(1)))
        .unwrap()
        .then(r => setBoardData(r))
    }
  }, [name])

  return (
    <div className='col-start-2 row-start-2 pl-[20px] pt-[14px] tablet:text-fs-18-lh-normal-fw-500'>
      {boardData?.title}
      <Button
        isAddIcon
        onClick={open}
        iconName='plus'
        className='w-[334px] bg-black-secondary py-[14px]'>
        Add another column
      </Button>
    </div>
  )
}
