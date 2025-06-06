class UserApiEndpoints {
  private readonly baseUrl = '/user'

  me = `${this.baseUrl}/me`
  help = `${this.baseUrl}/help`

  get root() {
    return this.baseUrl
  }
}

export const userApiEndpoints = new UserApiEndpoints()
