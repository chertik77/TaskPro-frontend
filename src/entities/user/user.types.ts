import type { InferOutput } from 'valibot'
import type { EditProfileModalSchema, UserSchema } from './user.contracts'

export type UserSchema = InferOutput<typeof UserSchema>
export type EditProfileModalSchema = InferOutput<typeof EditProfileModalSchema>
