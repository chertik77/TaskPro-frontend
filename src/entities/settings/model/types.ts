import type { InferOutput } from 'valibot'
import type { SettingsSchema } from './contract'

export type SettingsSchema = InferOutput<typeof SettingsSchema>
