import type { Dispatch, SetStateAction } from 'react'
import type { EditTaskData } from '../model/types'

import { startOfDay } from 'date-fns'

import {
  formatDeadlineDate,
  FormDeadlinePicker,
  FormPrioritySelector
} from '@/entities/task'

import { useAppForm } from '@/shared/lib'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PlusButtonWithLoader,
  TextArea
} from '@/shared/ui'

import { useEditTask } from '../api/useEditTask'
import { EditTaskSchema } from '../model/contract'

type EditTaskFormProps = {
  data: EditTaskData
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const EditTaskForm = ({
  data: { taskId, formValues },
  setIsDialogOpen
}: EditTaskFormProps) => {
  const form = useAppForm(EditTaskSchema, {
    defaultValues: formValues
  })

  const { mutate: editTask, isPending } = useEditTask(setIsDialogOpen)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(editedTask =>
          editTask({ taskId, ...editedTask })
        )}>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='mb-3.5'>
              <FormControl>
                <Input
                  placeholder='Title'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem className='mb-6'>
              <FormControl>
                <TextArea
                  placeholder='Description'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='priority'
          render={({ field }) => (
            <FormItem className='mb-3.5 space-y-1'>
              <FormLabel className='text-md text-black/50 dark:text-white/50'>
                Priority
              </FormLabel>
              <FormPrioritySelector {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='deadline'
          render={({ field, fieldState }) => {
            const isOverdue = startOfDay(field.value!) < startOfDay(new Date())

            return (
              <FormItem className='mb-6 space-y-1'>
                <FormLabel className='text-md text-black/50 dark:text-white/50'>
                  Deadline
                </FormLabel>
                <FormDeadlinePicker
                  mode='edit'
                  {...field}
                />
                <FormMessage />
                {!fieldState.error && isOverdue && (
                  <FormDescription className='mt-2'>
                    This task is <span className='text-red'>overdue</span> since{' '}
                    {formatDeadlineDate(field.value!, 'd MMM yyyy')}.
                  </FormDescription>
                )}
              </FormItem>
            )
          }}
        />
        <PlusButtonWithLoader
          type='submit'
          shouldShowLoader={isPending}
          disabled={isPending || !form.formState.isDirty}>
          Edit
        </PlusButtonWithLoader>
      </form>
    </Form>
  )
}
