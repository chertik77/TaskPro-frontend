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

export const EditUserSchema = v.partial(
  v.object({
    ...SignupSchema.entries,
    avatar: v.optional(v.instance(File))
  })
)

export const HelpSchema = v.object({
  email: SigninSchema.entries.email,
  comment: v.string([
    v.toTrimmed(),
    v.minLength(5, 'Please enter at least 5 characters.')
  ])
})

export type SigninSchema = v.Output<typeof SigninSchema>
export type SignupSchema = v.Output<typeof SignupSchema>
export type EditUserSchema = v.Output<typeof EditUserSchema>
export type HelpSchema = v.Output<typeof HelpSchema>
