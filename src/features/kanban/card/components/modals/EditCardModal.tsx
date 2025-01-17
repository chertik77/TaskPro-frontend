import type { CardTypes } from '@/shared/api/card'

import { useEffect } from 'react'
import { useEditCard } from '@/features/kanban/card/hooks'
import { CardContracts } from '@/shared/api/card'
import { Button, Field, Modal } from '@/shared/components/ui'
import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'
import { useModalInstance } from 'react-modal-state'

import { DatePicker } from '../ui'
import { ModalDescription } from './ModalDescription'
import { ModalPriorities } from './ModalPriorities'

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
