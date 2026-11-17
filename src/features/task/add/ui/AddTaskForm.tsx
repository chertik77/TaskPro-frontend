import { FormLabelsCombobox } from '@/entities/label'
import { FormDeadlinePicker, FormPrioritySelector } from '@/entities/task'

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

import { useAddTask } from '../api/useAddTask'
import { useAddTaskForm } from '../lib/useAddTaskForm'

type AddTaskFormProps = {
  columnId: string
  closeDialog: () => void
}

export const AddTaskForm = ({ columnId, closeDialog }: AddTaskFormProps) => {
  const form = useAddTaskForm()

  const { mutate: addTask, isPending } = useAddTask(columnId, closeDialog)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(data => addTask(data))}>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
          <FormField
            control={form.control}
            name='deadline'
            render={() => (
              <FormItem className='mb-6'>
                <FormLabel>Deadline</FormLabel>
                <FormDeadlinePicker />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <PlusButtonWithLoader
            type='submit'
            shouldShowLoader={isPending}
            disabled={isPending}>
            Add
          </PlusButtonWithLoader>
        </div>
      </form>
    </Form>
  )
}
