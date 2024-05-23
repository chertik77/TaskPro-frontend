import * as v from 'valibot'

import { SignupSchema } from './signup.schema'

export const EditUserSchema = v.partial(
  v.object({
    ...SignupSchema.entries,
    avatar: v.optional(v.instance(File))
  })
)

export type EditUserSchema = v.InferOutput<typeof EditUserSchema>
