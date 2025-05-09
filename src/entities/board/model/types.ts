import type { Column } from '@/entities/column/@x/board'
import type { InferInput } from 'valibot'
import type { BoardSchema } from '../api/contracts'
import type { ICONS } from './constants'

export type Board = {
  id: string
  title: string
  icon: Icon
  background: {
    identifier: string
    url: string | null
  }
  columns: Column[]
}

export type BoardSchema = InferInput<typeof BoardSchema>

export type Icon = (typeof ICONS)[number]

export type EditBoardModalProps = {
  title: string
  icon: Icon
  background: string
}
