import type { FieldValues, UseFormProps } from 'react-hook-form'
import type { GenericSchema, InferInput } from 'valibot'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'

export const useAppForm = <S extends GenericSchema<FieldValues>>(
  schema: S,
  options?: UseFormProps<InferInput<S>>
) =>
  useForm<InferInput<S>>({
    resolver: valibotResolver(schema),
    shouldUnregister: true,
    mode: 'onChange',
    ...options
  })
