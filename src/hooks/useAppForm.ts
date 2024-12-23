import type { UseFormProps } from 'react-hook-form'
import type { BaseSchema, Input } from 'valibot'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'

export const useAppForm = <S extends BaseSchema>(
  schema: S,
  options?: UseFormProps<Input<S>>
) =>
  useForm<Input<S>>({
    resolver: valibotResolver(schema),
    mode: 'onChange',
    ...options
  })
