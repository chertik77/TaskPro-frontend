import * as v from 'valibot'

import { THEMES } from '@/shared/constants'

export const UserSchema = v.object({
  id: v.string(),
  name: v.string(),
  email: v.string(),
  avatar: v.string(),
  theme: v.picklist(THEMES)
})

export const EditProfileModalSchema = v.pick(UserSchema, ['name', 'email'])
