import * as v from 'valibot'

export const AddPasskeyNameSchema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, 'Please enter at least 2 characters.')
  )
})

export type AddPasskeyNameSchema = v.InferOutput<typeof AddPasskeyNameSchema>
