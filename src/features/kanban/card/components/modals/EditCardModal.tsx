import type { EditCardModalProps } from 'features/kanban/card/card.types'

import { useEffect } from 'react'
import { useModalInstance } from 'react-modal-state'
import { Button } from 'shared/ui/button'
import { Field } from 'shared/ui/field'
import { Modal } from 'shared/ui/modal'

import { CardSchema } from 'features/kanban/card/card.schema'
import { useEditCard } from 'features/kanban/card/hooks'

import { useAppForm, useIsFormReadyForSubmit } from 'hooks'

import { DatePicker } from '../ui'
import { ModalDescription } from './ModalDescription'
import { ModalPriorities } from './ModalPriorities'

export const EditCardModal = () => {
  const { data: card } = useModalInstance<EditCardModalProps>()

  const { register, handleSubmit, formState, control, reset, watch } =
    useAppForm(CardSchema, { shouldUnregister: false })

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
