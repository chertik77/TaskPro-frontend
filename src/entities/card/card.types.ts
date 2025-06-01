import type { InferOutput } from 'valibot'
import type {
  CardSchema,
  CardSearchSchema,
  CardsSchema
} from './card.contracts'

export type CardSchema = InferOutput<typeof CardSchema>
export type CardsSchema = InferOutput<typeof CardsSchema>
export type CardSearchSchema = InferOutput<typeof CardSearchSchema>

export type EditCardDialogProps = Omit<CardSchema, 'columnId' | 'order'>
