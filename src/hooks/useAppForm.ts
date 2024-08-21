import type { UseFormProps } from 'react-hook-form'
import type { BaseSchema, Output } from 'valibot'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'

export const useAppForm = (
  schema: BaseSchema,
  options?: UseFormProps<Output<typeof schema>>
) =>
  useForm<Output<typeof schema>>({
    resolver: valibotResolver(schema),
    mode: 'onChange',
    ...options
  })
