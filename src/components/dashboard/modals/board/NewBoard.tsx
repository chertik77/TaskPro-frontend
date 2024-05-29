import type { Board } from 'types'

import { useQueryClient } from '@tanstack/react-query'
import { useModal } from 'react-modal-state'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm, useAppMutation } from 'hooks'

import { boardService } from 'services'

import { BoardSchema } from 'lib/schemas'

import { RadioInputBgImages } from './RadioInputBgImages'
import { RadioInputIcons } from './RadioInputIcons'

export const NewBoardModal = () => {
  const { close } = useModal(NewBoardModal)

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { register, formState, reset, handleSubmit, control } =
    useAppForm<BoardSchema>(BoardSchema, {
      defaultValues: { icon: 'icon-project-1', background: 'default' }
    })

  const { mutate, isPending } = useAppMutation<BoardSchema, Board>({
    mutationKey: ['addBoard'],
    mutationFn: data => boardService.addNewBoard(data),
    onSuccess(data) {
      close()
      reset()
      navigate(`/dashboard/${data.id}`)
      queryClient.invalidateQueries({ queryKey: ['boards'] })
    },
    onError() {
      toast.error(
        'Unexpected error during board creation. We apologize for the inconvenience. Please try again later.'
      )
    }
  })

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
