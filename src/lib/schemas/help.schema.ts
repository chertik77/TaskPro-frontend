import * as v from 'valibot'

export const HelpSchema = v.object({
  email: v.string([v.toTrimmed(), v.email('Please enter a valid email.')]),
  comment: v.string([
    v.toTrimmed(),
    v.minLength(5, 'Please enter at least 5 characters.')
  ])
})

export type HelpSchema = v.Output<typeof HelpSchema>
