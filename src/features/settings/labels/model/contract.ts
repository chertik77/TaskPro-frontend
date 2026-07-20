import * as v from 'valibot'

import { vAccentColor } from '@/shared/api'

export const AddLabelSchema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, 'Please enter at least 2 characters.')
  ),
  color: v.fallback(vAccentColor, 'blue')
})

export const EditLabelSchema = v.intersect([
  v.partial(AddLabelSchema),
  v.object({
    description: v.union([
      v.pipe(
        v.literal(''),
        v.transform(() => null)
      ),
      v.pipe(
        v.string(),
        v.trim(),
        v.minLength(3, 'Please enter at least 3 characters.')
      )
    ])
  })
])

export type AddLabelSchema = v.InferOutput<typeof AddLabelSchema>
export type EditLabelSchema = v.InferOutput<typeof EditLabelSchema>
