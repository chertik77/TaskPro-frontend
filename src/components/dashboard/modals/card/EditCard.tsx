import type { Card } from 'types'

import { useEffect } from 'react'
import { useModalInstance } from 'react-modal-state'

import { Button, DatePicker, Field, Modal } from 'components/ui'

import { useAppForm } from 'hooks'
import { useEditCard } from 'hooks/card'

import { CardSchema } from 'lib/schemas'

import { ModalDescription } from './ModalDescription'
import { ModalPriorities } from './ModalPriorities'

export const EditCardModal = () => {
  const {
    data: { title, description, id, priority, deadline }
  } = useModalInstance<Card>()

  const { register, handleSubmit, formState, control, reset, watch } =
    useAppForm(CardSchema, {
      defaultValues: { priority, deadline: new Date(deadline) }
    })

  const { mutate, isPending } = useEditCard(reset)

  useEffect(() => {
    reset({ title, priority, deadline: new Date(deadline), description })
  }, [deadline, description, priority, title, reset])

  const value = watch()

  const isFormReadyForSubmit =
    value.title?.trim() !== title ||
    value.description?.trim() !== description ||
    value.priority !== priority ||
    new Date(value.deadline).getTime() !== new Date(deadline).getTime()

  return (
    <Modal modalTitle='Edit card'>
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
