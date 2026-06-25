class TaskApiEndpoints {
  private readonly baseUrl = '/task'

  byId = (taskId: string) => `${this.baseUrl}/${taskId}`
  columnById = (columnId: string) => `${this.baseUrl}/${columnId}`
  order = (columnId: string) => `${this.columnById(columnId)}/order`

  get root() {
    return this.baseUrl
  }
}

export const taskApiEndpoints = new TaskApiEndpoints()
