import { Button, Field, Modal } from 'components/ui'
import { useAppForm } from 'hooks'

import { BoardSchema } from '../../board.schema'
import { useAddBoard } from '../../hooks'
import { RadioInputBgImages } from './RadioInputBgImages'
import { RadioInputIcons } from './RadioInputIcons'

export const NewBoardModal = () => {
  const { register, formState, reset, handleSubmit, control } = useAppForm(
    BoardSchema,
    { defaultValues: { icon: 'project', background: 'default' } }
  )

  const { mutate, isPending } = useAddBoard(reset)

  return (
    <Modal modalTitle='New board'>
      <form onSubmit={handleSubmit(data => mutate(data))}>
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
