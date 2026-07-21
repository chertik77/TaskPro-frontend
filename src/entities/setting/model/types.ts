import type { InferOutput } from 'valibot'
import type { SettingsSchema } from './contract'

export type SettingsSchema = InferOutput<typeof SettingsSchema>

type SettingsKeys<T> = Omit<T, 'id' | 'userId'>

type KeysOfType<T, TValue> = {
  [K in keyof T]-?: NonNullable<T[K]> extends TValue ? K : never
}[keyof T]

export type Option = {
  value: string
  label: string
}

export type SettingDefinition<
  T,
  TCustomKey extends keyof SettingsKeys<T> = never
> =
  | {
      type: 'select'
      key: KeysOfType<SettingsKeys<T>, string>
      title: string
      description: string
      options: Option[]
    }
  | {
      type: 'switch'
      key: KeysOfType<SettingsKeys<T>, boolean>
      title: string
      description: string
    }
  | {
      type: 'custom'
      key: TCustomKey
      title: string
      description: string
    }
