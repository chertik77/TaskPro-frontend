import { useAddCard } from '@/features/kanban/card/hooks'

import { CardContracts } from '@/shared/api/card'
import { Button, Field, Modal } from '@/shared/components/ui'
import { useAppForm } from '@/shared/hooks'

import { DatePicker } from '../ui'
import { ModalDescription } from './ModalDescription'
import { ModalPriorities } from './ModalPriorities'

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
        <Button
          isPlusIcon
          type='submit'
          shouldShowLoader={isPending}
          disabled={isPending}>
          {!isPending && 'Add'}
        </Button>
      </form>
    </Modal>
  )
}
