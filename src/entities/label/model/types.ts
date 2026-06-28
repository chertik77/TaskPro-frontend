import type { InferOutput } from 'valibot'
import type { LabelSchema, LabelsSchema } from './contracts'

export type LabelSchema = InferOutput<typeof LabelSchema>
export type LabelsSchema = InferOutput<typeof LabelsSchema>
