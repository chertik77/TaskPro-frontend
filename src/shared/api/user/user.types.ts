import type { InferOutput } from 'valibot'
import type {
  EditUserDtoSchema,
  HelpDtoSchema,
  UserDtoSchema
} from './user.contracts'

export type UserDto = InferOutput<typeof UserDtoSchema>
export type EditUserDto = InferOutput<typeof EditUserDtoSchema>
export type HelpDto = InferOutput<typeof HelpDtoSchema>
