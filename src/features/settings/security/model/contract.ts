import * as v from 'valibot'

export const PasskeyNameSchema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, 'Please enter at least 2 characters.')
  )
})

export type PasskeyNameSchema = v.InferOutput<typeof PasskeyNameSchema>
