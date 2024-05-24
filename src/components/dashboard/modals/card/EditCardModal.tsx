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
    data: { title, description, id, priority, deadline }
  } = useModalInstance<Card>()

  const { register, handleSubmit, formState, control, reset } =
    useAppForm<CardSchema>(CardSchema, {
      defaultValues: { title, description }
    })

  const { mutateAsync, isPending } = useAppMutation<CardSchema>({
    mutationKey: ['editCard'],
    mutationFn: cardData => cardService.editCard(id, cardData)
  })

  useEffect(() => {
    reset({ title, priority, deadline: new Date(deadline), description })
  }, [deadline, description, priority, title, reset])

  const fields = ['title', 'priority', 'description', 'deadline'] as const

  const isFormReadyForSubmit = fields.some(
    field => formState.dirtyFields[field]
  )

  const submit = (data: CardSchema) => {
    toast.promise(mutateAsync(data), {
      loading: 'Editing the task...',
      success: () => {
        close()
        reset()
        return 'Changes to the task have been saved successfully.'
      },
      error:
        'Unexpected error during task update. We apologize for the inconvenience. Please try again later.'
    })
  }

  console.log(formState.errors)
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
