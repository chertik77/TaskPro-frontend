import { BoardContracts } from '@/shared/api/board'
import { RadioInputBgImages, RadioInputIcons } from '@/shared/components'
import { Button, Field, Modal } from '@/shared/components/ui'
import { useAppForm } from '@/shared/hooks'

import { useAddBoard } from '../hooks'

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
        <Button
          type='submit'
          isPlusIcon
          shouldShowLoader={isPending}
          disabled={isPending}>
          {!isPending && 'Create'}
        </Button>
      </form>
    </Modal>
  )
}
