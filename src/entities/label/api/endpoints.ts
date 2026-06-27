class LabelApiEndpoints {
  private readonly baseUrl = '/label'

  add = `${this.baseUrl}/add`

  get root() {
    return this.baseUrl
  }
}

export const labelApiEndpoints = new LabelApiEndpoints()
