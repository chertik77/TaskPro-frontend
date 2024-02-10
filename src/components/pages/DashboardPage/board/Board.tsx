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
    <>
      {!boardData && (        
        <div className='flex h-screen w-full items-center justify-center'>
          <div className='h-[80px] w-[335px] text-center text-fs-12-lh-1.33-fw-400 text-black opacity-70 dark:text-white-gray-secondary  tablet:h-[72px] tablet:w-[486px] tablet:text-fs-14-lh-1.28-fw-400 '>
          Before starting your project, it is essential <span onClick={open} className='text-brand hocus:cursor-pointer hocus:text-brand-hover violet:text-brand-secondary violet:hocus:text-brand-third'>to create a board</span> to visualize and track all the necessary tasks and milestones. This board serves as a powerful tool to organize the workflow and ensure effective collaboration among team members.
          </div>        
        </div>
      )}
      {boardData && (
        <div className='col-start-2 row-start-2 pl-[20px] pt-[14px] text-fs-14-lh-normal-fw-500 text-black  dark:text-white'>
          {boardData?.title}
          <Button                  
            onClick={open}                        
            className='inline-flex h-[56px] w-[335px] items-center justify-center gap-2 rounded-md  bg-white fill-black px-[79px] py-[14px] text-fs-14-lh-normal-fw-500 dark:bg-black-secondary sm:w-[334px] sm:pl-[79px] sm:pr-[78px]'>
            <svg className='size-7 rounded-md bg-black text-white violet:bg-brand-secondary violet:text-white dark:bg-white dark:text-black'>
              <use xlinkHref="/assets/icons.svg#icon-plus" />
            </svg>
            Add another column
          </Button>
        </div>
      )}
    </>
  )
}

//   return (    
//         <div className='col-start-2 row-start-2 pl-[20px] pt-[14px] text-fs-14-lh-normal-fw-500 text-black  dark:text-white'>
//           {boardData?.title}
//           <Button                  
//             onClick={open}                        
//             className='inline-flex h-[56px] w-[335px] items-center justify-center gap-2 rounded-md  bg-white fill-black px-[79px] py-[14px] text-fs-14-lh-normal-fw-500 dark:bg-black-secondary sm:w-[334px] sm:pl-[79px] sm:pr-[78px]'>
//             <svg className='size-7 rounded-md bg-black text-white violet:bg-brand-secondary violet:text-white dark:bg-white dark:text-black'>
//               <use xlinkHref="/assets/icons.svg#icon-plus" />
//             </svg>
//             Add another column
//           </Button>
//         </div>    
//   )
// }

