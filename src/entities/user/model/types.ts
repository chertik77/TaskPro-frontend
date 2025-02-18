import type { InferInput } from 'valibot'
import type { EditUserSchema, HelpSchema } from '../api/contracts'
import type { THEMES } from './constants'

export type User = {
  id: string
  theme: Theme
  name: string
  email: string
  avatar: string
}

export type Theme = (typeof THEMES)[number]
export type EditUserSchema = InferInput<typeof EditUserSchema>
export type HelpSchema = InferInput<typeof HelpSchema>
