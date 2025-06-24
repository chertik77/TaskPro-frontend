import type { InferOutput } from 'valibot'
import type { UserSchema } from './contracts'

export type UserSchema = InferOutput<typeof UserSchema>
