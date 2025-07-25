class CardApiEndpoints {
  private readonly baseUrl = '/card'

  byId = (cardId: string) => `${this.baseUrl}/${cardId}`
  columnById = (columnId: string) => `${this.baseUrl}/${columnId}`
  order = (columnId: string) => `${this.columnById(columnId)}/order`

  get root() {
    return this.baseUrl
  }
}

export const cardApiEndpoints = new CardApiEndpoints()
