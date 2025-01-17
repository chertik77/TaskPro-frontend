import { AuthContracts } from 'shared/api/auth'
import * as v from 'valibot'

export const EditUserSchema = v.partial(
  v.object({
    ...AuthContracts.SignupSchema.entries,
    avatar: v.instance(File)
  })
)

export const HelpSchema = v.object({
  email: AuthContracts.SigninSchema.entries.email,
  comment: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(5, 'Please enter at least 5 characters.')
  )
})
