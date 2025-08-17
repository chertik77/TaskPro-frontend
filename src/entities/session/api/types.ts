import type { InferOutput } from 'valibot'
import type {
  InitiateGoogleResponseDtoSchema,
  SessionResponseDtoSchema,
  SigninDtoSchema,
  SignupDtoSchema
} from './contracts'

export type SessionResponseDto = InferOutput<typeof SessionResponseDtoSchema>
export type SigninDto = InferOutput<typeof SigninDtoSchema>
export type SignupDto = InferOutput<typeof SignupDtoSchema>
export type InitiateGoogleResponseDto = InferOutput<
  typeof InitiateGoogleResponseDtoSchema
>
