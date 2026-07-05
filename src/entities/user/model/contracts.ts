import * as v from 'valibot'

import { THEMES } from '@/shared/config'

export const UserSchema = v.object({
  id: v.string(),
  name: v.string(),
  email: v.string(),
  image: v.nullable(v.string()),
  theme: v.picklist(THEMES)
})
