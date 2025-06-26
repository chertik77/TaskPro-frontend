import * as v from 'valibot'

import { CARD_DEADLINES } from '../config/deadline.constants'
import { CARD_PRIORITIES } from '../config/priority.constants'

export const CardSchema = v.object({
  id: v.string(),
  title: v.string(),
  order: v.number(),
  columnId: v.string(),
  description: v.string(),
  priority: v.picklist(CARD_PRIORITIES),
  deadline: v.date()
})

export const CardsSchema = v.array(CardSchema)

export const CardSearchSchema = v.object({
  priority: v.optional(v.picklist(CARD_PRIORITIES)),
  deadline: v.optional(v.picklist(CARD_DEADLINES))
})
