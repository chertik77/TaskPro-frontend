export type InitialState = {
  user: { name: string | null; email: string | null }
  token: string | null
  isLoggedIn: boolean
  isRefreshing: boolean
}
