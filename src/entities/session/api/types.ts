import type { InferOutput } from 'valibot'
import type {
  GoogleInitiateResponseDtoSchema,
  SessionResponseDtoSchema,
  SigninDtoSchema,
  SignupDtoSchema
} from './contracts'

export type SessionResponseDto = InferOutput<typeof SessionResponseDtoSchema>
export type SigninDto = InferOutput<typeof SigninDtoSchema>
export type SignupDto = InferOutput<typeof SignupDtoSchema>
export type GoogleInitiateResponseDto = InferOutput<
  typeof GoogleInitiateResponseDtoSchema
>
