import { Board } from '@/features/kanban/board/components'
import { CardContracts } from '@/shared/api/card'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/dashboard/$boardId')({
  component: Board,
  validateSearch: CardContracts.CardSearchSchema
})
