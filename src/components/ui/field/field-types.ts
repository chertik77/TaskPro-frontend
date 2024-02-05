import type { VariantProps } from 'class-variance-authority'
import type { InputHTMLAttributes } from 'react'
import type { FieldErrors } from 'react-hook-form'
import { textAreaVariants } from './field-variants'

export type FieldProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof textAreaVariants> & {
    inputName: string
    isTextArea?: boolean
    isPasswordInput?: boolean
    inputPasswordPlaceholder?: string
    errors: FieldErrors
  }
