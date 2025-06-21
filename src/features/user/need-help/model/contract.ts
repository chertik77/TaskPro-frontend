import * as v from 'valibot'

export const HelpSchema = v.object({
  email: v.pipe(v.string(), v.trim(), v.email('Please enter a valid email.')),
  comment: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(5, 'Please enter at least 5 characters.')
  )
})

export type HelpSchema = v.InferOutput<typeof HelpSchema>
