import type { authClient } from '@/shared/api'
import type { InferOutput } from 'valibot'
import type { UserSchema } from './contract'

export type UserSchema = InferOutput<typeof UserSchema>
export type InferedSession = typeof authClient.$Infer.Session.session
