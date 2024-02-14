import { Select, SelectContent, SelectTrigger } from './CardSelectComponents'
import { useEditCardMutation } from 'redux/api/dashboard/card'
import { useBoardNameByLocation } from 'hooks'

export const CardColumnSelect = () => {
  const boardName = useBoardNameByLocation()

  const [editCard] = useEditCardMutation()
  const handleChange = () => {
    console.log('handle change')
    editCard({
      boardName,
      columnId: 'id',
      cardId: 'id',
      body: { columnId: '222' }
    })
  }

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger />
      <SelectContent />
    </Select>
  )
}
