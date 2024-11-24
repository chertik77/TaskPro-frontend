import { useModal } from 'react-modal-state'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm } from 'hooks'
import { useAddBoard } from 'hooks/board'

import { BoardSchema } from 'lib/schemas'

import { RadioInputBgImages } from './RadioInputBgImages'
import { RadioInputIcons } from './RadioInputIcons'

export const NewBoardModal = () => {
  const { close } = useModal(NewBoardModal)

  const { register, formState, reset, handleSubmit, control } = useAppForm(
    BoardSchema,
    { defaultValues: { icon: 'icon-project-1', background: 'default' } }
  )

  const { mutate, isPending } = useAddBoard(reset)

  return (
    <Modal
      modalTitle='New board'
      onClose={() => {
        close()
        reset()
      }}>
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
