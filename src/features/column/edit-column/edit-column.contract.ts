import * as v from 'valibot'

export const EditColumnSchema = v.partial(
  v.object({
    title: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(3, 'Please enter at least 3 characters.')
    )
  })
)

export type EditColumnSchema = v.InferOutput<typeof EditColumnSchema>
