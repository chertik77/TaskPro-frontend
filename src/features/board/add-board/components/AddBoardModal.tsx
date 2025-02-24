import {
  BoardContracts,
  RadioInputBgImages,
  RadioInputIcons
} from '@/entities/board'

import { useAppForm } from '@/shared/hooks'
import { Field, Modal, PlusButton } from '@/shared/ui'

import { useAddBoard } from '../hooks/useAddBoard'

export const AddBoardModal = () => {
  const { register, formState, reset, handleSubmit, control } = useAppForm(
    BoardContracts.BoardSchema,
    { defaultValues: { icon: 'project', background: 'default' } }
  )

  const { mutate: addBoard, isPending } = useAddBoard(reset)

  return (
    <Modal modalTitle='New board'>
      <form onSubmit={handleSubmit(data => addBoard(data))}>
        <Field
          {...register('title')}
          inputName='title'
          placeholder='Title'
          errors={formState.errors}
        />
        <RadioInputIcons control={control} />
        <RadioInputBgImages control={control} />
        <PlusButton
          type='submit'
          shouldShowLoader={isPending}
          disabled={isPending}>
          Create
        </PlusButton>
      </form>
    </Modal>
  )
}
