import type { Dispatch, SetStateAction } from 'react'
import type { EditTaskData } from '../model/types'

import { FormLabelsCombobox } from '@/entities/label'
import { FormDeadlinePicker, FormPrioritySelector } from '@/entities/task'

import { useAppForm } from '@/shared/lib'
import {
  Form,
  FormControl,
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
    defaultValues: {
      ...formValues,
      deadline: formValues.deadline ?? undefined,
      description: formValues.description ?? '',
      labels: formValues.labels?.map(l => l.id) ?? []
    }
  })

  const { mutate: editTask, isPending } = useEditTask(setIsDialogOpen)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(editedTask =>
          editTask({ path: { taskId }, body: editedTask })
        )}>
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
          defaultValue=''
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
          render={() => (
            <FormItem className='mb-6'>
              <FormLabel>Deadline</FormLabel>
              <FormDeadlinePicker mode='edit' />
              <FormMessage />
            </FormItem>
          )}
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
