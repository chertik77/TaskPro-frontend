import * as v from 'valibot'

import { DEADLINES, PRIORITIES } from '@/shared/constants'

export const CardSchema = v.object({
  id: v.string(),
  title: v.string(),
  order: v.number(),
  columnId: v.string(),
  description: v.string(),
  priority: v.picklist(PRIORITIES),
  deadline: v.date()
})

export const CardsSchema = v.array(CardSchema)

export const CardSearchSchema = v.object({
  priority: v.optional(v.picklist(PRIORITIES)),
  deadline: v.optional(v.picklist(DEADLINES))
})

export const AddCardModalSchema = v.pick(CardSchema, ['columnId'])

export const EditCardModalSchema = v.omit(CardSchema, ['columnId', 'order'])
