export type User = {
  id: string
  theme: string
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
