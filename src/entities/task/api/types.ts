import type { InferOutput } from 'valibot'
import type {
  AddTaskDtoSchema,
  EditTaskDtoSchema,
  TaskDtoSchema,
  TaskIdDtoSchema,
  UpdateTaskOrderDtoSchema
} from './contracts'

export type TaskDto = InferOutput<typeof TaskDtoSchema>
export type TaskIdDto = InferOutput<typeof TaskIdDtoSchema>
export type AddTaskDto = InferOutput<typeof AddTaskDtoSchema>
export type EditTaskDto = InferOutput<typeof EditTaskDtoSchema>
export type UpdateTaskOrderDto = InferOutput<typeof UpdateTaskOrderDtoSchema>
