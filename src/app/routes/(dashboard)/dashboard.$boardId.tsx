import { createFileRoute } from '@tanstack/react-router'
import { CardContracts } from 'shared/api/card'

import { Board } from 'features/kanban/board/components'

export const Route = createFileRoute('/(dashboard)/dashboard/$boardId')({
  component: Board,
  validateSearch: CardContracts.CardSearchSchema
})
