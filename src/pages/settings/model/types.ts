import type { ComponentType } from 'react'

export type Setting = {
  title: string
  description: string
  control: ComponentType
}
