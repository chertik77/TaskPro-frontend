import type { InferOutput } from 'valibot'
import type {
  AddCardModalSchema,
  CardSchema,
  CardSearchSchema,
  CardsSchema,
  EditCardModalSchema
} from './card.contracts'

export type CardSchema = InferOutput<typeof CardSchema>
export type CardsSchema = InferOutput<typeof CardsSchema>
export type CardSearchSchema = InferOutput<typeof CardSearchSchema>
export type AddCardModalSchema = InferOutput<typeof AddCardModalSchema>
export type EditCardModalSchema = InferOutput<typeof EditCardModalSchema>
