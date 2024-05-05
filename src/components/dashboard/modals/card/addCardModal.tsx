import type { CardSchemaFields } from 'lib/schemas'

import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { Button, Field, Modal } from 'components/ui'
import { DatePopover } from 'components/ui/calendar/DatePopover'

import { useAppForm } from 'hooks'
import { useAddCard } from 'hooks/card/useAddCard'

import { cardSchema } from 'lib/schemas'

import { ModalDescription } from './ModalDescription'
import { ModalPriorities } from './ModalPriorities'

export const AddCardModal = () => {
  const { close } = useModal('add-card-modal')

  const { register, handleSubmit, formState, setValue, reset, control } =
    useAppForm<CardSchemaFields>(cardSchema)

  const handleDeadlineChange = (date: string) => {
    setValue('deadline', date)
  }

  const { mutateAsync, isPending } = useAddCard()

  const onSubmit = (data: CardSchemaFields) => {
    toast.promise(mutateAsync(data), {
      loading: 'Adding card...',
      success: () => {
        reset()
        close()
        return "The task has been created successfully. Let's start working on it."
      },
      error: () => 'An error occurred while adding the card.'
    })
  }

  return (
    <Modal modalTitle='Add card'>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          control={control}
          errors={formState.errors}
        />
        <p className='mb-1 text-fs-12-lh-normal-fw-400 text-black/50 dark:text-white/50'>
          Deadline
        </p>
        <div className='relative'>
          <DatePopover onChange={handleDeadlineChange} />
          {formState.errors.deadline && (
            <span className=' absolute left-0 top-5 text-red-600'>
              Wrong date!
            </span>
          )}
        </div>
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
