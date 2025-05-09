import type { InferInput } from 'valibot'
import type {
  EditUserDtoSchema,
  HelpDtoSchema,
  ThemeDtoSchema,
  UserDtoSchema
} from './contracts'

export type UserDto = InferInput<typeof UserDtoSchema>
export type EditUserDto = InferInput<typeof EditUserDtoSchema>
export type ThemeDto = InferInput<typeof ThemeDtoSchema>
export type HelpDto = InferInput<typeof HelpDtoSchema>
