import * as v from 'valibot'

import { THEMES } from '@/shared/constants'

import { SigninDtoSchema, SignupDtoSchema } from '../auth/auth.contracts'

export const UserDtoSchema = v.object({
  id: v.string(),
  name: v.string(),
  email: v.string(),
  theme: v.picklist(THEMES),
  avatar: v.string()
})

export const EditUserDtoSchema = v.partial(
  v.object({
    ...SignupDtoSchema.entries,
    theme: UserDtoSchema.entries.theme,
    avatar: v.instance(File)
  })
)

export const HelpDtoSchema = v.object({
  email: SigninDtoSchema.entries.email,
  comment: v.pipe(v.string(), v.trim(), v.minLength(5))
})
