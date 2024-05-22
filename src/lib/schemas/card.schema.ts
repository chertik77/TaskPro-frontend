import type { Output } from 'valibot'

import { date, minLength, object, picklist, string, toTrimmed } from 'valibot'

import { priorities } from 'constants/priorities'

export const CardSchema = object({
  title: string([
    toTrimmed(),
    minLength(3, 'Please enter at least 3 characters.')
  ]),
  description: string([
    toTrimmed(),
    minLength(3, 'Please enter at least 3 characters.')
  ]),
  priority: picklist(priorities),
  deadline: date()
})

export type CardSchema = Output<typeof CardSchema>
