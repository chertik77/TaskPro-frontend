import type { InferOutput } from 'valibot'
import type { LabelDtoSchema } from './contracts'

export type LabelDto = InferOutput<typeof LabelDtoSchema>
