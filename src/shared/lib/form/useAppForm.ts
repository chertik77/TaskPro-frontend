import type { FieldValues, UseFormProps } from 'react-hook-form'
import type { GenericSchema, InferInput, InferOutput } from 'valibot'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'

export const useAppForm = <S extends GenericSchema<FieldValues>>(
  schema: S,
  options?: UseFormProps<InferInput<S>, unknown, InferOutput<S>>
) =>
  useForm<InferInput<S>, unknown, InferOutput<S>>({
    resolver: valibotResolver(schema),
    mode: 'onChange',
    ...options
  })
