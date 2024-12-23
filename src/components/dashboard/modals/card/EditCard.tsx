import type { Card } from 'types'

import { useEffect } from 'react'
import { useModalInstance } from 'react-modal-state'
import { keyof } from 'valibot'

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

  const { register, handleSubmit, formState, control, reset } = useAppForm(
    CardSchema,
    { defaultValues: { priority, deadline: new Date(deadline) } }
  )

  const { mutate, isPending } = useEditCard(reset)

  useEffect(() => {
    reset({ title, priority, deadline: new Date(deadline), description })
  }, [deadline, description, priority, title, reset])

  const isFormReadyForSubmit = keyof(CardSchema).options.some(
    field => formState.dirtyFields[field] && formState.isValid
  )

  return (
    <Modal
      modalTitle='Edit card'
      onAnimationEnd={reset}>
      <form
        onSubmit={handleSubmit(data => mutate({ cardId: id, cardData: data }))}>
        <Field
          errors={formState.errors}
          inputName='title'
          placeholder='Title'
          {...register('title', { setValueAs: value => value.trim() })}
        />
        <ModalDescription
          errors={formState.errors}
          {...register('description', { setValueAs: value => value.trim() })}
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
