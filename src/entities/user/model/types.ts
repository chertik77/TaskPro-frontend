import type { InferOutput } from 'valibot'
import type { UserSchema } from './contract'

export type UserSchema = InferOutput<typeof UserSchema>
