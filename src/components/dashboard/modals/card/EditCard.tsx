import type { Card } from 'types'

import { useEffect } from 'react'
import { useModalInstance } from 'react-modal-state'

import { Button, DatePicker, Field, Modal } from 'components/ui'

import { useAppForm, useSubmitDisabled } from 'hooks'
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

  const { isSubmitDisabled } = useSubmitDisabled(watch, {
    title,
    description,
    deadline,
    priority
  })

  // const isFormReadyForSubmit =
  //   value.title !== title ||
  //   value.description !== description ||
  //   value.priority !== priority ||
  //   new Date(value.deadline).getTime() !== new Date(deadline).getTime()

  return (
    <Modal modalTitle='Edit card'>
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
          disabled={isPending || isSubmitDisabled}>
          {!isPending && 'Edit'}
        </Button>
      </form>
    </Modal>
  )
}
