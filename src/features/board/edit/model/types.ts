import type { BoardBackgroundId, BoardIcon } from '@/shared/api'

export type EditBoardData = {
  title: string
  icon: BoardIcon
  background: BoardBackgroundId
}
