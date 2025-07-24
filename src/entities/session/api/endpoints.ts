class SessionApiEndpoints {
  private readonly baseUrl = '/auth'

  signup = `${this.baseUrl}/signup`
  signin = `${this.baseUrl}/signin`
  refresh = `${this.baseUrl}/refresh`
  logout = `${this.baseUrl}/logout`
  googleRedirect = `${this.baseUrl}/google/redirect`
  googleCallback = `${this.baseUrl}/google/callback`
}

export const sessionApiEndpoints = new SessionApiEndpoints()
