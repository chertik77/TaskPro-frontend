import type { FieldValues, UseFormProps } from 'react-hook-form'
import type { BaseSchema } from 'valibot'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'

export const useAppForm = <T extends FieldValues>(
  schema: BaseSchema,
  options?: UseFormProps<T>
) =>
  useForm<T>({
    defaultValues: options?.defaultValues,
    resolver: valibotResolver(schema),
    mode: 'onChange'
  })
