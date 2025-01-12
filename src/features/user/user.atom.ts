import type { User } from './user.types'

import { atomWithStorage } from 'jotai/utils'

import { DEFAULT_THEME } from './user.constants'

export const userAtom = atomWithStorage<User>('user', {
  id: '',
  name: '',
  email: '',
  avatar: '',
  theme: DEFAULT_THEME
})
