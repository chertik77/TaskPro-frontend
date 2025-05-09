import * as v from 'valibot'

export const EditUserSchema = v.partial(
  v.object({
    name: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(2, 'Please enter at least 2 characters.'),
      v.maxLength(32, 'Please enter at most 32 characters.')
    ),
    email: v.pipe(v.string(), v.trim(), v.email('Please enter a valid email.')),
    password: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(8, 'Please enter at least 8 characters.'),
      v.maxLength(64, 'Please enter at most 64 characters.')
    ),
    avatar: v.instance(File)
  })
)

export type EditUserSchema = v.InferInput<typeof EditUserSchema>
