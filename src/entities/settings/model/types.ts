import type { InferOutput } from 'valibot'
import type { SettingsSchema } from './contracts'

export type SettingsSchema = InferOutput<typeof SettingsSchema>
