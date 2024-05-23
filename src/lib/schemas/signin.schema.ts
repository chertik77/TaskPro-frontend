import * as v from 'valibot'

export const SigninSchema = v.object({
  email: v.string([v.toTrimmed(), v.email('Please enter a valid email.')]),
  password: v.string([
    v.toTrimmed(),
    v.minLength(8, 'Please enter at least 8 characters.'),
    v.maxLength(64, 'Please enter at most 64 characters.')
  ])
})

export type SigninSchema = v.Output<typeof SigninSchema>
