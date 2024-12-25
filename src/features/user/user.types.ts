import type { Theme } from './user.constants'

export type User = {
  id: string
  theme: Theme
  name: string
  email: string
  avatar: string
}
