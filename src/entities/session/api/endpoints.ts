class SessionApiEndpoints {
  private readonly baseUrl = '/auth'

  signup = `${this.baseUrl}/signup`
  signin = `${this.baseUrl}/signin`
  refresh = `${this.baseUrl}/refresh`
  logout = `${this.baseUrl}/logout`
  googleInitiate = `${this.baseUrl}/google/initiate`
  facebookInitiate = `${this.baseUrl}/facebook/initiate`
}

export const sessionApiEndpoints = new SessionApiEndpoints()
