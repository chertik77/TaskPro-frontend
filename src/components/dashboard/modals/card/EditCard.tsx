import type { Card } from 'types'

import { useEffect } from 'react'
import { useModal, useModalInstance } from 'react-modal-state'

import { Button, DatePicker, Field, Modal } from 'components/ui'

import { useAppForm } from 'hooks'
import { useEditCard } from 'hooks/card'

import { CardSchema } from 'lib/schemas'

import { ModalDescription } from './ModalDescription'
import { ModalPriorities } from './ModalPriorities'

export const EditCardModal = () => {
  const { close } = useModal(EditCardModal)

  const {
    data: { title, description, id, priority, deadline }
  } = useModalInstance<Card>()

  const { register, handleSubmit, formState, control, reset } = useAppForm(
    CardSchema,
    { defaultValues: { title, description } }
  )

  const { mutate, isPending } = useEditCard(reset)

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
      <form
        onSubmit={handleSubmit(data => mutate({ cardId: id, cardData: data }))}>
        <Field
          errors={formState.errors}
          inputName='title'
          placeholder='Title'
          {...register('title')}
        />
        <ModalDescription
          errors={formState.errors}
          {...register('description')}
        />
        <ModalPriorities control={control} />
        <DatePicker control={control} />
        <Button
          type='submit'
          isPlusIcon
          shouldShowLoader={isPending}
          disabled={isPending || !isFormReadyForSubmit}>
          {!isPending && 'Edit'}
        </Button>
      </form>
    </Modal>
  )
}
