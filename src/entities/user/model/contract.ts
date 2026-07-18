import * as v from 'valibot'

export const UserSchema = v.object({
  id: v.string(),
  name: v.string(),
  email: v.string(),
  image: v.nullable(v.string())
})
