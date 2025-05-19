import type { InferOutput } from 'valibot'
import type { UserSchema } from './user.contracts'

export type UserSchema = InferOutput<typeof UserSchema>
