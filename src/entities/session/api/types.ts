import type { InferOutput } from 'valibot'
import type {
  GoogleSigninDtoSchema,
  RefreshTokenDtoSchema,
  SessionResponseDtoSchema,
  SigninDtoSchema,
  SignupDtoSchema,
  TokensDtoSchema
} from './contracts'

export type SessionResponseDto = InferOutput<typeof SessionResponseDtoSchema>
export type TokensDto = InferOutput<typeof TokensDtoSchema>
export type SigninDto = InferOutput<typeof SigninDtoSchema>
export type SignupDto = InferOutput<typeof SignupDtoSchema>
export type GoogleSigninDto = InferOutput<typeof GoogleSigninDtoSchema>
export type RefreshTokenDto = InferOutput<typeof RefreshTokenDtoSchema>
