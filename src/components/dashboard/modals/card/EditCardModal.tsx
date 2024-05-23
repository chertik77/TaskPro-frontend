import type { Card } from 'types'

import { useEffect } from 'react'
import { useModal, useModalInstance } from 'react-modal-state'
import { toast } from 'sonner'

import { Button, DatePicker, Field, Modal } from 'components/ui'

import { useAppForm, useAppMutation } from 'hooks'

import { cardService } from 'services'

import { CardSchema } from 'lib/schemas'

import { ModalDescription } from './ModalDescription'
import { ModalPriorities } from './ModalPriorities'

export const EditCardModal = () => {
  const { close } = useModal(EditCardModal)

  const {
    data: { title, description, board, column, _id, priority, deadline }
  } = useModalInstance<Card>()

  const { register, handleSubmit, formState, control, reset } =
    useAppForm<CardSchema>(CardSchema, {
      defaultValues: { title, description }
    })

  const { mutateAsync, isPending } = useAppMutation<CardSchema>({
    mutationKey: ['editCard'],
    mutationFn: cardData => cardService.editCard(board, column, _id, cardData)
  })

  useEffect(() => {
    reset({ title, priority, deadline, description })
  }, [deadline, description, priority, title, reset])

  const fields = ['title', 'priority', 'description', 'deadline'] as const

  const isFormReadyForSubmit = fields.some(
    field => formState.dirtyFields[field]
  )

  const submit = (data: CardSchema) => {
    toast.promise(mutateAsync(data), {
      loading: 'Editing...',
      success: () => {
        close()
        reset()
        return 'The task has been edited successfully!'
      },
      error:
        'Something went wrong while editing the card. Our team is already working on this issue. Please bear with us.'
    })
  }

  return (
    <Modal
      modalTitle='Edit card'
      onClose={() => {
        close()
        reset()
      }}>
      <form onSubmit={handleSubmit(submit)}>
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
          errors={formState.errors}
          control={control}
        />
        <DatePicker control={control} />
        <Button
          isPlusIcon
          type='submit'
          disabled={isPending || !isFormReadyForSubmit}>
          {isPending ? 'Editing...' : 'Edit'}
        </Button>
      </form>
    </Modal>
  )
}
