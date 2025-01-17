import * as v from 'valibot'

import { SigninSchema, SignupSchema } from 'api/auth/auth.contracts'

export const EditUserSchema = v.partial(
  v.object({
    ...SignupSchema.entries,
    avatar: v.instance(File)
  })
)

export const HelpSchema = v.object({
  email: SigninSchema.entries.email,
  comment: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(5, 'Please enter at least 5 characters.')
  )
})
