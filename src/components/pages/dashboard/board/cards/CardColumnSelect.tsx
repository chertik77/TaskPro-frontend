import { useChangeCardColumnMutation } from 'redux/api/dashboard/card'
import type { Card } from 'redux/slices/board/board-types'
import { Select, SelectContent, SelectTrigger } from './CardSelectComponents'

export const CardColumnSelect = ({ card }: { card: Card }) => {
  const [changeColumn] = useChangeCardColumnMutation()

  return (
    <Select
      onValueChange={e =>
        changeColumn({
          boardId: card.board,
          columnId: card.column,
          cardId: card?._id,
          newColumnId: e
        })
      }>
      <SelectTrigger />
      <SelectContent card={card} />
    </Select>
  )
}
