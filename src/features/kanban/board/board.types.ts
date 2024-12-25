import type { Column } from '../column/column.types'

export type Board = {
  id: string
  title: string
  icon: string
  background: {
    hasWhiteTextColor: boolean
    identifier: string
    url: string
  }
  columns: Column[]
}
