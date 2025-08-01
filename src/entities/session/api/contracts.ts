import * as v from 'valibot'

import { UserDtoSchema } from '@/entities/user/@x/session'

export const SigninDtoSchema = v.object({
  email: v.pipe(v.string(), v.trim(), v.email()),
  password: v.pipe(v.string(), v.trim(), v.minLength(8), v.maxLength(64))
})

export const SignupDtoSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(2), v.maxLength(32)),
  ...SigninDtoSchema.entries
})

export const SessionResponseDtoSchema = v.object({
  user: v.lazy(() => UserDtoSchema)
})

export const GoogleIntiateResponseDtoSchema = v.object({
  redirectUrl: v.pipe(v.string(), v.url())
})
