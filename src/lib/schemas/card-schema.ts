import type { Output } from 'valibot'

import { minLength, object, picklist, string, toTrimmed } from 'valibot'

const priorityList = ['Low', 'Medium', 'High', 'Without priority']

export const cardSchema = object({
  title: string([
    toTrimmed(),
    minLength(3, 'Please enter at least 3 characters.')
  ]),
  description: string([
    toTrimmed(),
    minLength(3, 'Please enter at least 3 characters.')
  ]),
  priority: picklist(priorityList, 'Please select a priority.'),
  deadline: string([])
})

export type CardSchemaFields = Output<typeof cardSchema>
