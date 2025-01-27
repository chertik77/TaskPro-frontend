import { createFileRoute } from '@tanstack/react-router'

import { Board } from 'features/kanban/board/components'
import { CardSearchSchema } from 'features/kanban/card/card.schema'

export const Route = createFileRoute('/(dashboard)/dashboard/$boardId')({
  component: Board,
  validateSearch: CardSearchSchema
})
