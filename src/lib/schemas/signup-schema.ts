import type { Output } from 'valibot'

import { email, maxLength, minLength, object, string, toTrimmed } from 'valibot'

export const signupSchema = object({
  name: string([
    toTrimmed(),
    minLength(2, 'Please enter at least 2 characters.'),
    maxLength(32, 'Please enter at most 32 characters.')
  ]),
  email: string([toTrimmed(), email('Please enter a valid email.')]),
  password: string([
    toTrimmed(),
    minLength(8, 'Please enter at least 8 characters.'),
    maxLength(64, 'Please enter at most 64 characters.')
  ])
})

export type SignupSchemaFields = Output<typeof signupSchema>
