import type { InferOutput } from 'valibot'
import type { BoardSchema, BoardsSchema } from './board.contracts'

export type BoardSchema = InferOutput<typeof BoardSchema>
export type BoardsSchema = InferOutput<typeof BoardsSchema>
