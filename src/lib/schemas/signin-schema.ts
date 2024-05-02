import type { Output } from 'valibot'

import { email, maxLength, minLength, object, string, toTrimmed } from 'valibot'

export const signinSchema = object({
  email: string([toTrimmed(), email('Please enter a valid email.')]),
  password: string([
    toTrimmed(),
    minLength(8, 'Please enter at least 8 characters.'),
    maxLength(64, 'Please enter at most 64 characters.')
  ])
})

export type SigninSchemaFields = Output<typeof signinSchema>
