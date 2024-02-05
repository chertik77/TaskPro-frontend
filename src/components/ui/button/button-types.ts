import type { ButtonHTMLAttributes } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isAddIcon?: boolean
  isSmallIcon?: boolean
  iconName?: string
}
