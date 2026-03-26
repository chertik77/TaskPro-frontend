import type { InferOutput } from 'valibot'
import type {
  SessionResponseDtoSchema,
  SigninDtoSchema,
  SignupDtoSchema
} from './contracts'

export type SessionResponseDto = InferOutput<typeof SessionResponseDtoSchema>
export type SigninDto = InferOutput<typeof SigninDtoSchema>
export type SignupDto = InferOutput<typeof SignupDtoSchema>
