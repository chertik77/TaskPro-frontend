import { Select, SelectContent, SelectTrigger } from './CardSelectComponents'
// import { useEditCardMutation } from 'redux/api/dashboard/card'
// import { useBoardByLocation } from 'hooks'
import type { Card } from 'redux/slices/board/board-types'

export const CardColumnSelect = ({ card }: { card: Card }) => {
  // const boardId = useBoardByLocation()
  // const cardData = localStorage.getItem('change-column-ids') ?? ''
  // const { cardId, columnId } = JSON.parse(cardData) ?? ''

  // const [editCard] = useEditCardMutation()
  const handleChange = () => {
    // editCard({
    //   boardId,
    //   columnId,
    //   cardId,
    //   body: { column: '65cd3ce8f68b993b425bfddc' }
    // })
  }

  const handleOpen = card => {
    localStorage.setItem(
      'change-column-ids',
      JSON.stringify({ columnId: card.column, cardId: card._id })
    )
  }

  return (
    <Select
      onValueChange={handleChange}
      onOpenChange={open => {
        if (open) {
          handleOpen(card)
        }
      }}>
      <SelectTrigger />
      <SelectContent />
    </Select>
  )
}
