import type { User } from 'features/user/model'

export type AuthResponse = {
  refreshToken: string
  accessToken: string
  user: User
}

export type Tokens = Omit<AuthResponse, 'user'>
