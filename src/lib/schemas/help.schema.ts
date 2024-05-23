import * as v from 'valibot'

import { SigninSchema } from './signin.schema'

export const HelpSchema = v.object({
  email: SigninSchema.entries.email,
  comment: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(5, 'Please enter at least 5 characters.')
  )
})

export type HelpSchema = v.InferOutput<typeof HelpSchema>
