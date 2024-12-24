import * as v from 'valibot'

export const SigninSchema = v.object({
  email: v.string([v.toTrimmed(), v.email('Please enter a valid email.')]),
  password: v.string([
    v.toTrimmed(),
    v.minLength(8, 'Please enter at least 8 characters.'),
    v.maxLength(64, 'Please enter at most 64 characters.')
  ])
})

export const SignupSchema = v.object({
  name: v.string([
    v.toTrimmed(),
    v.minLength(2, 'Please enter at least 2 characters.'),
    v.maxLength(32, 'Please enter at most 32 characters.')
  ]),
  ...SigninSchema.entries
})
