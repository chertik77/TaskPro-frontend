import type { Icon } from '@/shared/constants'
import type { InferOutput } from 'valibot'
import type { BoardSchema, BoardsSchema } from './board.contracts'

export type BoardSchema = InferOutput<typeof BoardSchema>
export type BoardsSchema = InferOutput<typeof BoardsSchema>

export type EditBoardFormValues = {
  title: string
  icon: Icon
  background: string
}
