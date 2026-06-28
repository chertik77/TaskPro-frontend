import type { InferOutput } from 'valibot'
import type { AddLabelDtoSchema, LabelDtoSchema } from './contracts'

export type LabelDto = InferOutput<typeof LabelDtoSchema>
export type AddLabelDto = InferOutput<typeof AddLabelDtoSchema>
