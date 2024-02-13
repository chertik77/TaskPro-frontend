import { Button } from 'components/ui'
import { Column } from 'redux/slices/board/board-types'
import { BoardHeadingItem } from './BoardHeadingItem'
import { useModal } from 'react-modal-state'

export const BoardHeadingList = ({ columns }: { columns?: Column[] }) => {
  const { open } = useModal('add-card-modal')


  const addIdToLocaleStorage=(id:string)=>{
localStorage.setItem("idColumn",JSON.stringify(id))
  }


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
