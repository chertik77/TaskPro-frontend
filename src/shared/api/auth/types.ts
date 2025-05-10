import type { InferOutput } from 'valibot'
import type {
  AuthResponseDtoSchema,
  GoogleSigninDtoSchema,
  RefreshTokenDtoSchema,
  SigninDtoSchema,
  SignupDtoSchema,
  TokensDtoSchema
} from './contracts'

export type AuthResponseDto = InferOutput<typeof AuthResponseDtoSchema>
export type TokensDto = InferOutput<typeof TokensDtoSchema>
export type SigninDto = InferOutput<typeof SigninDtoSchema>
export type SignupDto = InferOutput<typeof SignupDtoSchema>
export type GoogleSigninDto = InferOutput<typeof GoogleSigninDtoSchema>
export type RefreshTokenDto = InferOutput<typeof RefreshTokenDtoSchema>
