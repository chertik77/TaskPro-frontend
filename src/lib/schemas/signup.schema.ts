import type { Output } from 'valibot'

import {
  email,
  instance,
  maxLength,
  minLength,
  object,
  optional,
  partial,
  string,
  toTrimmed
} from 'valibot'

export const SignupSchema = object({
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
  ]),
  avatar: optional(instance(File))
})

export const PartialSignupSchema = partial(SignupSchema)

export type SignupSchema = Output<typeof SignupSchema>

export type PartialSignupSchema = Output<typeof PartialSignupSchema>
