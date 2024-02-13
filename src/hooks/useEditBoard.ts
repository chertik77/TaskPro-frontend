import { valibotResolver } from '@hookform/resolvers/valibot'
import { EditBoard, editBoardSchema } from 'lib/schemas/editBoardModal'
import { useForm } from 'react-hook-form'

export const useEditBoard = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid }
  } = useForm<EditBoard>({
    defaultValues: { icon: 'icon-project-1', background: 'default' },
    resolver: valibotResolver(editBoardSchema),
    mode: 'onChange'
  })

  return { register, errors, handleSubmit, reset, control, isValid }
}
