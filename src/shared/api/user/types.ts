import type { InferOutput } from 'valibot'
import type {
  EditUserDtoSchema,
  HelpDtoSchema,
  ThemeDtoSchema,
  UserDtoSchema
} from './contracts'

export type UserDto = InferOutput<typeof UserDtoSchema>
export type EditUserDto = InferOutput<typeof EditUserDtoSchema>
export type ThemeDto = InferOutput<typeof ThemeDtoSchema>
export type HelpDto = InferOutput<typeof HelpDtoSchema>
