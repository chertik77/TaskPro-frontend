import { valibotResolver } from '@hookform/resolvers/valibot'
import { ColumnModal, columnSchema } from 'lib/schemas/addComumn-shema'

import { useForm } from 'react-hook-form'

export const useAddColumnForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ColumnModal>({
    resolver: valibotResolver(columnSchema),
    mode: 'onChange'
  })

  return { register, handleSubmit, errors }
}
