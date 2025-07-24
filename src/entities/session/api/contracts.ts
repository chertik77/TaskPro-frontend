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

export const GoogleSigninDtoSchema = v.object({
  code: v.pipe(v.string(), v.minLength(1))
})

export const RefreshTokenDtoSchema = v.object({
  refreshToken: v.pipe(v.string(), v.minLength(1))
})

export const SessionResponseDtoSchema = v.object({
  accessToken: v.string(),
  refreshToken: v.string(),
  user: v.lazy(() => UserDtoSchema)
})

export const TokensDtoSchema = v.omit(SessionResponseDtoSchema, ['user'])
