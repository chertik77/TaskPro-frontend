import type { CardSchemaFields } from 'lib/schemas'
import type { Card } from 'types'

import { useModal, useModalInstance } from 'react-modal-state'
import { toast } from 'sonner'

import { Button, Field, Modal } from 'components/ui'
import { DatePopover } from 'components/ui/calendar/DatePopover'

import { useAppForm, useGetBoardId, useAppMutation } from 'hooks'

import { cardService } from 'services'

import { cardSchema } from 'lib/schemas'

import { ModalDescription } from './ModalDescription'
import { ModalPriorities } from './ModalPriorities'

export const EditCardModal = () => {
  const { close } = useModal('edit-card-modal')

  const { data } = useModalInstance<Card>()

  const boardId = useGetBoardId()

  const { register, handleSubmit, formState, setValue, control, reset } =
    useAppForm<CardSchemaFields>(cardSchema, {
      defaultValues: {
        title: data?.title,
        priority: data?.priority,
        description: data?.description
      }
    })

  const handleDeadlineChange = (date: string) => {
    setValue('deadline', date)
  }

  const { mutateAsync, isPending } = useAppMutation<CardSchemaFields>({
    mutationKey: ['editCard'],
    mutationFn: cardData =>
      cardService.editCard(boardId, data.column, data._id, cardData)
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
        <p
          className='mb-[4px] select-none text-fs-12-lh-normal-fw-400 text-black/50
            violet:text-black/50 dark:text-white/50'>
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
          {isPending ? 'Editing...' : 'Edit'}
        </Button>
      </form>
    </Modal>
  )
}
