import type { DefaultValues, FieldValues } from 'react-hook-form'
import type { BaseSchema } from 'valibot'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'

type UseAppFormOptions<T extends FieldValues> = {
  defaultValues?: DefaultValues<T>
  persistedKey?: string
}

export const useAppForm = <T extends FieldValues>(
  schema: BaseSchema,
  options?: UseAppFormOptions<T>
) =>
  useForm<T>({
    defaultValues: options?.defaultValues,
    resolver: valibotResolver(schema),
    mode: 'onChange'
  })
