import type { BoardSchemaFields } from 'lib/schemas'
import type { Board } from 'types'

import { useModal } from 'react-modal-state'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm, useAppMutation } from 'hooks'

import { boardService } from 'services'

import { boardSchema } from 'lib/schemas'

import { RadioInputBgImages } from './RadioInputBgImages'
import { RadioInputIcons } from './RadioInputIcons'

export const AddBoardModal = () => {
  const { close } = useModal(AddBoardModal)

  const navigate = useNavigate()

  const { register, formState, reset, handleSubmit, control } =
    useAppForm<BoardSchemaFields>(boardSchema, {
      defaultValues: { icon: 'icon-project-1', background: 'default' }
    })

  const { mutateAsync, isPending } = useAppMutation<BoardSchemaFields, Board>({
    mutationKey: ['addBoard'],
    mutationFn: data => boardService.addNewBoard(data),
    invalidateQueryKey: 'boards'
  })

  const submit = (data: BoardSchemaFields) => {
    toast.promise(mutateAsync(data), {
      loading: 'Creating board...',
      success: data => {
        close()
        reset()
        navigate(`/dashboard/${data._id}`)
        return 'Board successfully added to your collection!'
      },
      error: 'An error occurred while creating a board. Please try again later.'
    })
  }

  return (
    <Modal
      modalTitle='New board'
      onClose={() => {
        close()
        reset()
      }}>
      <form onSubmit={handleSubmit(submit)}>
        <Field
          {...register('title')}
          inputName='title'
          className={formState.errors ? 'mb-2' : 'violet:text-black'}
          placeholder='Title'
          errors={formState.errors}
        />
        <RadioInputIcons control={control} />
        <RadioInputBgImages control={control} />
        <Button
          type='submit'
          isPlusIcon
          disabled={isPending}>
          {isPending ? 'Creating...' : 'Create'}
        </Button>
      </form>
    </Modal>
  )
}
