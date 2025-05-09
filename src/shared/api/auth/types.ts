import type { InferInput } from 'valibot'
import type {
  AuthResponseDtoSchema,
  GoogleSigninDtoSchema,
  RefreshTokenDtoSchema,
  SigninDtoSchema,
  SignupDtoSchema,
  TokensDtoSchema
} from './contracts'

export type AuthResponseDto = InferInput<typeof AuthResponseDtoSchema>
export type TokensDto = InferInput<typeof TokensDtoSchema>
export type SigninDto = InferInput<typeof SigninDtoSchema>
export type SignupDto = InferInput<typeof SignupDtoSchema>
export type GoogleSigninDto = InferInput<typeof GoogleSigninDtoSchema>
export type RefreshTokenDto = InferInput<typeof RefreshTokenDtoSchema>
