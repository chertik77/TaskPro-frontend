export type User = {
  _id: string
  userTheme: string
  name: string
  email: string
  avatarURL: {
    url: string
  }
}

export type AuthResponse = {
  token: string
  user: User
}
