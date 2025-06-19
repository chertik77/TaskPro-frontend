import * as v from 'valibot'

import { THEMES } from '@/shared/config'

export const UserDtoSchema = v.object({
  id: v.string(),
  name: v.string(),
  email: v.string(),
  theme: v.picklist(THEMES),
  avatar: v.string()
})

export const EditUserDtoSchema = v.partial(
  v.object({
    name: v.pipe(v.string(), v.trim(), v.minLength(2), v.maxLength(32)),
    email: v.pipe(v.string(), v.trim(), v.email()),
    password: v.pipe(v.string(), v.trim(), v.minLength(8), v.maxLength(64)),
    theme: v.picklist(THEMES),
    avatar: v.instance(File)
  })
)

export const HelpDtoSchema = v.object({
  email: v.pipe(v.string(), v.trim(), v.email()),
  comment: v.pipe(v.string(), v.trim(), v.minLength(5))
})
