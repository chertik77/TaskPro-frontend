class BoardApiEndpoints {
  private readonly baseUrl = '/board'

  byId = (boardId: string) => `${this.baseUrl}/${boardId}`

  get root() {
    return this.baseUrl
  }
}

export const boardApiEndpoints = new BoardApiEndpoints()
