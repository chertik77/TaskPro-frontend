import type { CardSchemaFields } from 'lib/schemas'

import { axiosWithAuth } from 'api'

class TaskService {
  async addNewTask(boardId: string, columnId: string, data: CardSchemaFields) {
    const response = await axiosWithAuth.post(
      `/dashboard/${boardId}/${columnId}`,
      data
    )

    return response.data
  }
}

export const taskService = new TaskService()
