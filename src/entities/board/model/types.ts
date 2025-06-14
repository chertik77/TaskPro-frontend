import type { InferOutput } from 'valibot'
import type { BoardSchema, BoardsSchema } from './contracts'

export type BoardSchema = InferOutput<typeof BoardSchema>
export type BoardsSchema = InferOutput<typeof BoardsSchema>
