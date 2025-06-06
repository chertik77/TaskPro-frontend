class AuthApiEndpoints {
  private readonly baseUrl = '/auth'

  signup = `${this.baseUrl}/signup`
  signin = `${this.baseUrl}/signin`
  tokens = `${this.baseUrl}/tokens`
  logout = `${this.baseUrl}/logout`
  google = `${this.baseUrl}/google`
}

export const authApiEndpoints = new AuthApiEndpoints()
