import * as v from 'valibot'

export const NameSchema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, 'Please enter at least 2 characters.'),
    v.maxLength(32, 'Please enter at most 32 characters.')
  )
})

export const DeleteAccountSchema = v.object({
  password: v.pipe(v.string(), v.minLength(2, 'Please enter your password.'))
})

export type NameSchema = v.InferOutput<typeof NameSchema>
export type DeleteAccountSchema = v.InferOutput<typeof DeleteAccountSchema>
