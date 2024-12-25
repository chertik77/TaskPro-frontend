import type { Theme } from 'constants/themes'

export type User = {
  id: string
  theme: Theme
  name: string
  email: string
  avatar: string
}

export type AuthResponse = {
  refreshToken: string
  accessToken: string
  user: User
}

export type Tokens = Omit<AuthResponse, 'user'>
