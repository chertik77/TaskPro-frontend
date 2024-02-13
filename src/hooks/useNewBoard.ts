import { valibotResolver } from '@hookform/resolvers/valibot'
import { AddNewBoard, newBoardSchema } from 'lib/schemas/newBoardModal'
import { useForm } from 'react-hook-form'

export const useNewBoard = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid }
  } = useForm<AddNewBoard>({
    defaultValues: { icon: 'icon-project-1', background: 'default' },
    resolver: valibotResolver(newBoardSchema),
    mode: 'onChange'
  })

  return { register, errors, handleSubmit, reset, control, isValid }
}
