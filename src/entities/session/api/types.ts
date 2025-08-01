import type { InferOutput } from 'valibot'
import type {
  GoogleIntiateResponseDtoSchema,
  SessionResponseDtoSchema,
  SigninDtoSchema,
  SignupDtoSchema
} from './contracts'

export type SessionResponseDto = InferOutput<typeof SessionResponseDtoSchema>
export type SigninDto = InferOutput<typeof SigninDtoSchema>
export type SignupDto = InferOutput<typeof SignupDtoSchema>
export type GoogleIntiateResponseDto = InferOutput<
  typeof GoogleIntiateResponseDtoSchema
>
