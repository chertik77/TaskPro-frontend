import {
  CardContracts,
  DatePicker,
  ModalDescription,
  ModalPriorities
} from '@/entities/card'

import { useAppForm } from '@/shared/hooks'
import { Field, Modal, PlusButton } from '@/shared/ui'

import { useAddCard } from '../hooks/useAddCard'

export const AddCardModal = () => {
  const { register, handleSubmit, formState, reset, control } = useAppForm(
    CardContracts.CardSchema,
    { defaultValues: { priority: 'Without', deadline: new Date() } }
  )

  const { mutate: addCard, isPending } = useAddCard(reset)

  return (
    <Modal modalTitle='Add card'>
      <form onSubmit={handleSubmit(data => addCard(data))}>
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
        <PlusButton
          type='submit'
          shouldShowLoader={isPending}
          disabled={isPending}>
          Add
        </PlusButton>
      </form>
    </Modal>
  )
}
