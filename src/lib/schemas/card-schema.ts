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
  priority: picklist(priorityList),
  // dedlaine: date([toMinValue(new Date())])
  deadline: string([
    //   // minValue(`${yyyy}-${mm.toString().padStart(2, '0')}-${dd}`)
  ])
})

export type CardSchemaFields = Output<typeof cardSchema>
