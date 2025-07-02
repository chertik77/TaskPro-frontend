import type { InferOutput } from 'valibot'
import type { CARD_DEADLINES } from '../config/deadline'
import type { CARD_PRIORITIES } from '../config/priority'
import type { CardSchema, CardSearchSchema, CardsSchema } from './contracts'

export type CardSchema = InferOutput<typeof CardSchema>
export type CardsSchema = InferOutput<typeof CardsSchema>
export type CardSearchSchema = InferOutput<typeof CardSearchSchema>
export type CardDeadline = (typeof CARD_DEADLINES)[number]
export type CardPriority = (typeof CARD_PRIORITIES)[number]
