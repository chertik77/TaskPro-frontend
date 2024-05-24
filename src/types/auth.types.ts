export type User = {
  id: string
  theme: string
  name: string
  email: string
  avatar: string
}

export type AuthResponse = {
  token: string
  user: User
}
