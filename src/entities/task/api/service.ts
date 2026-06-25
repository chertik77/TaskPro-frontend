import type {
  AddTaskDto,
  EditTaskDto,
  TaskIdDto,
  UpdateTaskOrderDto
} from './types'

import { parse } from 'valibot'

import { axiosInstance } from '@/shared/api'

import {
  AddTaskDtoSchema,
  EditTaskDtoSchema,
  TaskIdDtoSchema,
  UpdateTaskOrderDtoSchema
} from './contracts'
import { taskApiEndpoints } from './endpoints'

export const taskService = {
  async addTask(data: AddTaskDto) {
    const { columnId, ...addTaskDto } = parse(AddTaskDtoSchema, data)

    await axiosInstance.post(taskApiEndpoints.columnById(columnId), addTaskDto)
  },

  async editTask(data: EditTaskDto) {
    const { taskId, ...editTaskDto } = parse(EditTaskDtoSchema, data)

    await axiosInstance.patch(taskApiEndpoints.byId(taskId), editTaskDto)
  },

  async updateTaskOrder(data: UpdateTaskOrderDto) {
    const { columnId, ...updateTaskOrderDto } = parse(
      UpdateTaskOrderDtoSchema,
      data
    )

    await axiosInstance.patch(
      taskApiEndpoints.order(columnId),
      updateTaskOrderDto
    )
  },

  async deleteTask(data: TaskIdDto) {
    const { taskId } = parse(TaskIdDtoSchema, data)

    await axiosInstance.delete(taskApiEndpoints.byId(taskId))
  }
}
