import type { authClient } from '@/shared/api'

export type InferredSession = typeof authClient.$Infer.Session.session
