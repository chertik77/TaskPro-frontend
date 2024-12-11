import { SigninSchema, SignupSchema } from 'features/authentication/model'
import * as v from 'valibot'

export const EditUserSchema = v.partial(
  v.object({
    ...SignupSchema.entries,
    avatar: v.instance(File)
  })
)

export const HelpSchema = v.object({
  email: SigninSchema.entries.email,
  comment: v.string([
    v.toTrimmed(),
    v.minLength(5, 'Please enter at least 5 characters.')
  ])
})

export type EditUserSchema = v.Output<typeof EditUserSchema>
export type HelpSchema = v.Output<typeof HelpSchema>
