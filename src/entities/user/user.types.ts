import type { InferInput } from 'valibot'
import type { EditProfileModalSchema, UserSchema } from './user.contracts'

export type UserSchema = InferInput<typeof UserSchema>
export type EditProfileModalSchema = InferInput<typeof EditProfileModalSchema>
