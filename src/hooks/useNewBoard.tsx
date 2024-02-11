import { valibotResolver } from '@hookform/resolvers/valibot'
import { AddNewBoard, newBoardSchema } from 'lib/schemas/newBord'
import { useForm } from 'react-hook-form'

export const useNewBoard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AddNewBoard>({
    resolver: valibotResolver(newBoardSchema),
    mode: 'onChange'
  })

  return { register, errors, handleSubmit, reset }
}
