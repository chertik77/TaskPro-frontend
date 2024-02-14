import { Content, Item, ItemText, Root, Trigger } from '@radix-ui/react-select'
import { useSelector } from 'react-redux'
import { selectColumns } from 'redux/slices/board/board-slice'

const Select = Root
const SelectTrigger = () => {
  //   const onEdit = () => {
  //     console.log('1111')
  //     localStorage.setItem(
  //       'change-column-ids',
  //       JSON.stringify({ columnId: card.column, cardId: card._id })
  //     )
  //   }

  return (
    <Trigger className='flex items-center gap-1 bg-transparent focus:outline-none'>
      <svg className='size-[16px] stroke-black/50 transition duration-300 ease-in-out hocus:stroke-black dark:stroke-white/50 dark:hocus:stroke-white'>
        <use xlinkHref='/assets/icons.svg#icon-arrow-btn'></use>
      </svg>
    </Trigger>
  )
}
const SelectContent = () => {
  const columns = useSelector(selectColumns)

  return (
    <Content
      className='rounded-lg border border-brand bg-white-primary 
      p-[18px] violet:border-white-gray-secondary dark:bg-black-fourth'
      position='popper'>
      {columns?.map(column => (
        <Item
          key={column._id}
          className='svg-[state=checked]:stroke-brand mb-1 cursor-pointer text-fs-14-lh-1.28-fw-400 text-black 
          outline-none data-[state=checked]:text-brand
           violet:data-[state=checked]:text-brand-secondary dark:text-white/30 dark:data-[state=checked]:text-brand'
          value={column.title}>
          <ItemText>
            <span className='pr-[8px]'>{column.title}</span>
            <svg className='inline size-[16px] stroke-black/50  dark:stroke-white/50'>
              <use xlinkHref='/assets/icons.svg#icon-arrow-btn'></use>
            </svg>
          </ItemText>
        </Item>
      ))}
    </Content>
  )
}

export { Select, SelectContent, SelectTrigger }
