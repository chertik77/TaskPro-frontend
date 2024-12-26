import type { Column } from '../column/column.types'
import type { Icon } from './board.constants'

export type Board = {
  id: string
  title: string
  icon: Icon
  background: {
    hasWhiteTextColor: boolean
    identifier: string
    url: string
  }
  columns: Column[]
}

export type EditBoardModalProps = {
  title: string
  icon: Icon
  background: string
}
