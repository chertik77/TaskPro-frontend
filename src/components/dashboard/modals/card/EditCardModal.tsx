import type { CardSchemaFields } from 'lib/schemas'
import type { Card } from 'types'

import { useModal, useModalInstance } from 'react-modal-state'
import { toast } from 'sonner'

import { Button, DatePicker, Field, Modal } from 'components/ui'

import { useAppForm, useAppMutation } from 'hooks'

import { cardService } from 'services'

import { cardSchema } from 'lib/schemas'

import { ModalDescription } from './ModalDescription'
import { ModalPriorities } from './ModalPriorities'

export const EditCardModal = () => {
  const { close } = useModal(EditCardModal)

  const { data: card } = useModalInstance<Card>()

  const { register, handleSubmit, formState, control, reset } =
    useAppForm<CardSchemaFields>(cardSchema, {
      defaultValues: {
        title: card?.title,
        priority: card?.priority,
        description: card?.description,
        deadline: card?.deadline as unknown as Date
      }
    })

  const { mutateAsync, isPending } = useAppMutation<CardSchemaFields>({
    mutationKey: ['editCard'],
    mutationFn: cardData =>
      cardService.editCard(card.board, card.column, card._id, cardData)
  })

  const submit = (data: CardSchemaFields) => {
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
    <Modal modalTitle='Edit card'>
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
          disabled={isPending}>
          {isPending ? 'Editing...' : 'Edit'}
        </Button>
      </form>
    </Modal>
  )
}
