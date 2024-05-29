import type { Card } from 'types'

import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
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
    data: { title, description, id, priority, deadline }
  } = useModalInstance<Card>()

  const queryClient = useQueryClient()

  const { register, handleSubmit, formState, control, reset } =
    useAppForm<CardSchema>(CardSchema, {
      defaultValues: { title, description }
    })

  const { mutate, isPending } = useAppMutation<CardSchema>({
    mutationKey: ['editCard'],
    mutationFn: cardData => cardService.editCard(id, cardData),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['board'] })
      close()
      reset()
    },
    onError() {
      toast.error(
        'Unexpected error during task update. We apologize for the inconvenience. Please try again later.'
      )
    }
  })

  useEffect(() => {
    reset({ title, priority, deadline: new Date(deadline), description })
  }, [deadline, description, priority, title, reset])

  const fields = ['title', 'priority', 'description', 'deadline'] as const

  const isFormReadyForSubmit = fields.some(
    field => formState.dirtyFields[field]
  )

  return (
    <Modal
      modalTitle='Edit card'
      onClose={() => {
        close()
        reset()
      }}>
      <form onSubmit={handleSubmit(data => mutate(data))}>
        <Field
          errors={formState.errors}
          className='mb-3.5'
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
