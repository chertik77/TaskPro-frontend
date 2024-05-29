import { useModal } from 'react-modal-state'

import { Button, DatePicker, Field, Modal } from 'components/ui'

import { useAppForm } from 'hooks'
import { useAddCard } from 'hooks/card/useAddCard'

import { CardSchema } from 'lib/schemas'

import { ModalDescription } from './ModalDescription'
import { ModalPriorities } from './ModalPriorities'

export const AddCardModal = () => {
  const { close } = useModal(AddCardModal)

  const { register, handleSubmit, formState, reset, control } =
    useAppForm<CardSchema>(CardSchema, {
      defaultValues: { priority: 'Without priority', deadline: new Date() }
    })

  const { mutate, isPending } = useAddCard(reset)

  return (
    <Modal
      modalTitle='Add card'
      onClose={() => {
        close()
        reset()
      }}>
      <form onSubmit={handleSubmit(data => mutate(data))}>
        <Field
          errors={formState.errors}
          className='mb-3.5'
          inputName='title'
          placeholder='Title'
          {...register('title')}
        />
        <ModalDescription
          errors={formState.errors}
          {...register('description')}
        />
        <ModalPriorities
          control={control}
          errors={formState.errors}
        />
        <DatePicker control={control} />
        <Button
          isPlusIcon
          type='submit'
          disabled={isPending}>
          {isPending ? 'Adding...' : 'Add'}
        </Button>
      </form>
    </Modal>
  )
}
