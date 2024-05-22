import type { Output } from 'valibot'

import { email, minLength, object, string, toTrimmed } from 'valibot'

export const HelpSchema = object({
  email: string([toTrimmed(), email('Please enter a valid email.')]),
  comment: string([
    toTrimmed(),
    minLength(5, 'Please enter at least 5 characters.')
  ])
})

export type HelpSchema = Output<typeof HelpSchema>
