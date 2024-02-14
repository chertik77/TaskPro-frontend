import { Select, SelectContent, SelectTrigger } from './CardSelectComponents'
import { useEditCardMutation } from 'redux/api/dashboard/card'
import { useBoardByLocation } from 'hooks'
import type { Card } from 'redux/slices/board/board-types'

export const CardColumnSelect = ({ card }: { card: Card }) => {
  const boardId = useBoardByLocation()

  const [editCard] = useEditCardMutation()
  const handleChange = () => {
    console.log('handle change')
    editCard({
      boardId,
      columnId: 'id',
      cardId: 'id',
      body: { columnId: '222' }
    })
  }

  const handleOpen = card => {
    console.log('on open handler')
    localStorage.setItem(
      'change-column-ids',
      JSON.stringify({ columnId: card.column, cardId: card._id })
    )
  }

  return (
    <Select onValueChange={handleChange} onOpenChange={handleOpen(card)}>
      <SelectTrigger />
      <SelectContent />
    </Select>
  )
}
