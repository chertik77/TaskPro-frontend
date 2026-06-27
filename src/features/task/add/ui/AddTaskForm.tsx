import type { Dispatch, SetStateAction } from 'react'

import { useMemo } from 'react'
import { addDays } from 'date-fns'

import { FormLabelsCombobox } from '@/entities/label'
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

import { useAddTask } from '../api/useAddTask'
import { AddTaskSchema } from '../model/contract'

type AddTaskFormProps = {
  columnId: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const AddTaskForm = ({
  columnId,
  setIsDialogOpen
}: AddTaskFormProps) => {
  const deadline = useMemo(() => addDays(new Date(), 1), [])

  const form = useAppForm(AddTaskSchema, {
    defaultValues: {
      title: '',
      description: '',
      priority: 'Without',
      deadline,
      labels: []
    }
  })

  const { mutate: addTask, isPending } = useAddTask(columnId, setIsDialogOpen)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(data => addTask(data))}>
        <FormField
          control={form.control}
          name='title'
          render={() => (
            <FormItem className='mb-3.5'>
              <FormLabel>Title</FormLabel>
              <FormControl render={<Input />} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={() => (
            <FormItem className='mb-6'>
              <FormLabel>Description</FormLabel>
              <FormControl render={<TextArea />} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='labels'
          render={() => (
            <FormItem className='mb-3.5'>
              <FormLabel>Labels</FormLabel>
              <FormLabelsCombobox labelsValues={form.getValues('labels')} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='priority'
          render={() => (
            <FormItem className='mb-3.5'>
              <FormLabel>Priority</FormLabel>
              <FormPrioritySelector />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='deadline'
          render={({ field, fieldState }) => (
            <FormItem className='mb-6'>
              <FormLabel>Deadline</FormLabel>
              <FormDeadlinePicker mode='create' />
              {fieldState.error ? (
                <FormMessage />
              ) : (
                <FormDescription className='mt-2'>
                  {`This task is due on ${formatDeadlineDate(field.value, 'd MMM yyyy')}.`}
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <PlusButtonWithLoader
          type='submit'
          shouldShowLoader={isPending}
          disabled={isPending}>
          Add
        </PlusButtonWithLoader>
      </form>
    </Form>
  )
}
