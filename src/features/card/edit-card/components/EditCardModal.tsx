import type { CardTypes } from '@/entities/card'

import { useEffect } from 'react'
import {
  CardContracts,
  DatePicker,
  ModalDescription,
  ModalPriorities
} from '@/entities/card'
import { useModalInstance } from 'react-modal-state'

import { Button, Field, Modal } from '@/shared/components/ui'
import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'

import { useEditCard } from '../hooks/useEditCard'

export const EditCardModal = () => {
  const { data: card } = useModalInstance<CardTypes.EditCardModalProps>()

  const { register, handleSubmit, formState, control, reset, watch } =
    useAppForm(CardContracts.CardSchema, { shouldUnregister: false })

  const { mutate: editCard, isPending } = useEditCard(reset)

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(card, watch)

  useEffect(() => {
    reset(card)
  }, [reset, card])

  return (
    <Modal modalTitle='Edit card'>
      <form
        onSubmit={handleSubmit(data =>
          editCard({ cardId: card.id, cardData: data })
        )}>
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
