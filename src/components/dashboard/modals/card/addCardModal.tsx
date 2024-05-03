import type { CardSchemaFields } from 'lib/schemas'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useModal, useModalInstance } from 'react-modal-state'

import { Button, Field, Modal, RadioPriority } from 'components/ui'

import { useAppForm, useBoardByLocation } from 'hooks'

import { taskService } from 'services/task.service'

import { cn } from 'lib'
import { cardSchema } from 'lib/schemas'

export const AddCardModal = () => {
  const boardId = useBoardByLocation()
  const { data: column } = useModalInstance<string>()

  // const [addNewCard, { isLoading }] = useAddNewCardMutation()
  const { close } = useModal('add-card-modal')
  const { register, handleSubmit, formState } = useAppForm<CardSchemaFields>(
    cardSchema,
    {
      defaultValues: {
        priority: 'Without priority'
      }
    }
  )

  console.log(column)
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['task'],
    mutationFn: (data: CardSchemaFields) =>
      taskService.addNewTask(boardId!, column, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['column'] })
      close()
    }
  })

  const onSubmit = (data: CardSchemaFields) => {
    mutate(data)
    // addNewCard({
    //   boardId,
    //   body: data,
    //   columnId: localStorage.getItem('columnId')
    // })
    //   .unwrap()
    //   .then(() => {
    //     toast.success(
    //       `The task has been created successfully. Let's start working on it.`
    //     )
    //     close()
    //     reset()
    //   })
    //   .catch(() => {
    //     toast.error(
    //       'Something went wrong while adding the card. Our team is already working on this issue. Please bear with us.'
    //     )
    //   })
  }

  return (
    <Modal modalTitle='Add card'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          errors={formState.errors}
          className='mb-[14px]'
          inputName='title'
          type='text'
          placeholder='Title'
          {...register('title')}
        />
        <textarea
          placeholder='Description'
          {...register('description')}
          className={cn(
            `h-[154px] w-full resize-none rounded-lg border border-brand border-opacity-40
            bg-transparent px-[18px] py-[14px] text-fs-14-lh-1.28-fw-400 text-black
            outline-none placeholder:opacity-40 focus:border-opacity-100
            violet:border-brand-secondary dark:text-white`,
            !formState.errors.description && 'mb-6'
          )}
        />
        {formState.errors.description && (
          <p className='mb-[14px] text-red-600'>
            Please enter at least 2 characters.
          </p>
        )}
        <p
          className='mb-[4px] select-none text-fs-12-lh-normal-fw-400 text-black/50
            violet:text-black/50 dark:text-white/50'>
          Label color
        </p>
        <div className='mb-[14px] flex gap-2'>
          <RadioPriority
            color='bg-priority-low'
            value='Low'
            {...register('priority')}
          />
          <RadioPriority
            color='bg-priority-medium'
            value='Medium'
            {...register('priority')}
          />
          <RadioPriority
            color='bg-brand'
            value='High'
            {...register('priority')}
          />
          <RadioPriority
            color='bg-black/30 dark:bg-white/30'
            value='Without priority'
            {...register('priority')}
          />
        </div>
        <p
          className='mb-[4px] select-none text-fs-12-lh-normal-fw-400 text-black/50
            violet:text-black/50 dark:text-white/50'>
          Deadline
        </p>
        <div className='relative'>
          <input
            type='date'
            className='mb-[40px] '
            {...register('deadline')}
          />
          {formState.errors.deadline && (
            <span className=' absolute left-0 top-5 text-red-600'>
              Wrong date!
            </span>
          )}
        </div>
        <Button
          isAddIcon
          iconName='plus'
          type='submit'
          disabled={!formState.isValid || isPending}>
          {isPending ? 'Adding...' : 'Add'}
        </Button>
      </form>
    </Modal>
  )
}
