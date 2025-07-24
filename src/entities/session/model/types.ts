import type { InferOutput } from 'valibot'
import type { GoogleCallbackSearchSchema } from './contracts'

export type GoogleCallbackSearchSchema = InferOutput<
  typeof GoogleCallbackSearchSchema
>
