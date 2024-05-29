export type User = {
  id: string
  theme: string
  name: string
  email: string
  avatar: string
}

export type AuthResponse = {
  tokens: {
    refreshToken: string
    accessToken: string
  }
  user: User
}
