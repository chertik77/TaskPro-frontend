import * as v from 'valibot'

import { SigninSchema } from './signin.schema'

export const HelpSchema = v.object({
  email: SigninSchema.entries.email,
  comment: v.string([
    v.toTrimmed(),
    v.minLength(5, 'Please enter at least 5 characters.')
  ])
})

export type HelpSchema = v.Output<typeof HelpSchema>
