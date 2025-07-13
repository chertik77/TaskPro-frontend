import type { BoardTypes } from '@/entities/board'

export type EditBoardData = {
  title: string
  icon: BoardTypes.BoardIcon
  background: BoardTypes.BoardBgImageId
}
