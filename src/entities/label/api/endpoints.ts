class LabelApiEndpoints {
  private readonly baseUrl = '/label'

  get root() {
    return this.baseUrl
  }
}

export const labelApiEndpoints = new LabelApiEndpoints()
