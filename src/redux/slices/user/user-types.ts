export type InitialState = {
  user: {
    name: string | null
    email: string | null
    password: string | null
    avatarURL: { url: string } | null
    userTheme: string | null
  }
  token: string | null
  isLoggedIn: boolean
  isRefreshing: boolean
}
