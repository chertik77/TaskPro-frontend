import { valibotResolver } from '@hookform/resolvers/valibot'
import { BoardModal, boardSchema } from 'lib/schemas/boardModas-schema'
import { useForm } from 'react-hook-form'

export const useBoard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<BoardModal>({
    resolver: valibotResolver(boardSchema),
    mode: 'onChange'
  })

  return { register, errors, handleSubmit, reset }
}
