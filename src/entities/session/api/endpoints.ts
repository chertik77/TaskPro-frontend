class SessionApiEndpoints {
  private readonly baseUrl = '/auth'

  signup = `${this.baseUrl}/signup`
  signin = `${this.baseUrl}/signin`
  refresh = `${this.baseUrl}/refresh`
  logout = `${this.baseUrl}/logout`
  googleInitiate = `${this.baseUrl}/google/initiate`
  microsoftInitiate = `${this.baseUrl}/microsoft/initiate`
}

export const sessionApiEndpoints = new SessionApiEndpoints()
