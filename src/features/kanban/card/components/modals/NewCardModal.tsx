import { CardSchema } from 'features/kanban/card/card.schema'
import { useAddCard } from 'features/kanban/card/hooks'

import { Button, Field, Modal } from 'components/ui'
import { useAppForm } from 'hooks'

import { DatePicker } from '../ui'
import { ModalDescription } from './ModalDescription'
import { ModalPriorities } from './ModalPriorities'

export const NewCardModal = () => {
  const { register, handleSubmit, formState, reset, control } = useAppForm(
    CardSchema,
    { defaultValues: { priority: 'Without', deadline: new Date() } }
  )

  const { mutate, isPending } = useAddCard(reset)

  return (
    <Modal modalTitle='Add card'>
      <form onSubmit={handleSubmit(data => mutate(data))}>
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
