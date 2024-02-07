export type InitialState = {
  user: {
    name: string | null
    email: string | null
    avatarURL: { url: string }
    userTheme: string
  }
  token: string | null
  isLoggedIn: boolean
  isRefreshing: boolean
}
