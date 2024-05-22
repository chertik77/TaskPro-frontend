import type { CardSchema } from 'lib/schemas'

import { useModal, useModalInstance } from 'react-modal-state'
import { toast } from 'sonner'

import { Button, DatePicker, Field, Modal } from 'components/ui'

import { useAppForm, useAppMutation, useGetBoardId } from 'hooks'

import { cardService } from 'services'

import { ModalDescription } from './ModalDescription'
import { ModalPriorities } from './ModalPriorities'

export const AddCardModal = () => {
  const boardId = useGetBoardId()

  const { close } = useModal(AddCardModal)

  const { data: column } = useModalInstance<string>()

  const { register, handleSubmit, formState, reset, control } =
    useAppForm<CardSchema>(CardSchema, {
      defaultValues: { priority: 'Without priority', deadline: new Date() }
    })

  const { mutateAsync, isPending } = useAppMutation<CardSchema>({
    mutationKey: ['addCard'],
    mutationFn: data => cardService.addNewCard(boardId!, column, data)
  })

  const onSubmit = (data: CardSchema) => {
    toast.promise(mutateAsync(data), {
      loading: 'Adding card...',
      success: () => {
        reset()
        close()
        return "The task has been created successfully. Let's start working on it."
      },
      error: 'An error occurred while adding the card.'
    })
  }

  return (
    <Modal
      modalTitle='Add card'
      onClose={() => {
        close()
        reset()
      }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          errors={formState.errors}
          className='mb-default'
          inputName='title'
          type='text'
          placeholder='Title'
          {...register('title')}
        />
        <ModalDescription
          errors={formState.errors}
          {...register('description')}
        />
        <ModalPriorities
          control={control}
          errors={formState.errors}
        />
        <DatePicker control={control} />
        <Button
          isPlusIcon
          type='submit'
          disabled={isPending}>
          {isPending ? 'Adding...' : 'Add'}
        </Button>
      </form>
    </Modal>
  )
}
