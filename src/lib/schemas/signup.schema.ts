import type { Output } from 'valibot'

import * as v from 'valibot'

import { SigninSchema } from './signin.schema'

export const SignupSchema = v.object({
  name: v.string([
    v.toTrimmed(),
    v.minLength(2, 'Please enter at least 2 characters.'),
    v.maxLength(32, 'Please enter at most 32 characters.')
  ]),
  ...SigninSchema.entries
})

export type SignupSchema = Output<typeof SignupSchema>
