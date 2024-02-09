import { Button } from 'components/ui'
import { useModal } from 'react-modal-state'
import { useParams } from 'react-router-dom'
import { useGetBoardByNameQuery } from 'redux/api/dashboard/board'

export const Board = () => {
  const { name } = useParams()
  const { data } = useGetBoardByNameQuery(name?.slice(1))
  const { open } = useModal('add-column-modal')
  console.log(data)
  // const dispatch = useAppDispatch()

  // useEffect(() => {
  //   dispatch(boardApi.endpoints.getBoardByName.initiate(name?.slice(1)))
  // }, [])

  return (
    <div className='col-start-2 row-start-2 pl-[20px] pt-[14px] tablet:text-fs-18-lh-normal-fw-500'>
      {data?.title}
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
