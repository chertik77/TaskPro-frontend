class ColumnApiEndpoints {
  private readonly baseUrl = '/column'

  byId = (columnId: string) => `${this.baseUrl}/${columnId}`
  boardById = (boardId: string) => `${this.baseUrl}/${boardId}`
  order = (boardId: string) => `${this.boardById(boardId)}/order`

  get root() {
    return this.baseUrl
  }
}

export const columnApiEndpoints = new ColumnApiEndpoints()
