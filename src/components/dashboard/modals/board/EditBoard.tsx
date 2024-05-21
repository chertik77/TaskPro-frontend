import type { BoardSchemaFields } from 'lib/schemas'

import { Controller } from 'react-hook-form'
import { useModal, useModalInstance } from 'react-modal-state'
import { toast } from 'sonner'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm, useAppMutation, useGetBoardId } from 'hooks'

import { boardService } from 'services'

import { boardSchema } from 'lib/schemas'

import { BackgroundImages } from './BackgroundImages'
import { Icons } from './Icons'

export const EditBoardModal = () => {
  const boardId = useGetBoardId()

  const { close } = useModal(EditBoardModal)

  const { data } = useModalInstance<{ title: string; icon: string }>()

  const { register, reset, handleSubmit, control, formState } =
    useAppForm<BoardSchemaFields>(boardSchema, {
      defaultValues: {
        title: data.title ?? '',
        icon: data.icon ?? '',
        background: 'default'
      }
    })

  const { mutateAsync, isPending } = useAppMutation<BoardSchemaFields>({
    mutationKey: ['editBoard'],
    mutationFn: data => boardService.editBoard(boardId, data),
    invalidateQueryKey: 'boards'
  })

  const submit = (data: BoardSchemaFields) => {
    toast.promise(mutateAsync(data), {
      loading: 'Editing board...',
      success: () => {
        reset()
        close()
        return 'The board has been edited successfully!'
      },
      error: 'An error occurred while editing the board.'
    })
  }

  return (
    <Modal modalTitle='Edit board'>
      <form onSubmit={handleSubmit(submit)}>
        <Field
          {...register('title')}
          inputName='title'
          placeholder='Title'
          errors={formState.errors}
          className='violet:text-black'
        />
        <p className='mt-6'>Icons</p>
        <Controller
          control={control}
          name='icon'
          render={props => <Icons {...props} />}
        />
        <p className='mt-6'>Background</p>
        <Controller
          control={control}
          name='background'
          render={props => <BackgroundImages {...props} />}
        />
        <Button
          type='submit'
          isPlusIcon
          disabled={isPending}>
          {isPending ? 'Editing...' : 'Edit'}
        </Button>
      </form>
    </Modal>
  )
}
