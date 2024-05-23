import * as v from 'valibot'

import { SigninSchema } from './signin.schema'

export const SignupSchema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, 'Please enter at least 2 characters.'),
    v.maxLength(32, 'Please enter at most 32 characters.')
  ),
  ...SigninSchema.entries
})

export type SignupSchema = v.InferOutput<typeof SignupSchema>
