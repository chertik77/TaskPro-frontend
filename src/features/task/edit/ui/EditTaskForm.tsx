import type { EditTaskData } from '../model/types'

import { FormLabelsCombobox } from '@/entities/label'
import {
  FormDeadlinePicker,
  FormPrioritySelector,
  parseDeadline
} from '@/entities/task'

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
  closeDialog: () => void
}

export const EditTaskForm = ({
  data: { taskId, formValues },
  closeDialog
}: EditTaskFormProps) => {
  const form = useAppForm(EditTaskSchema, {
    defaultValues: {
      ...formValues,
      deadline: parseDeadline(formValues.deadline),
      description: formValues.description ?? '',
      labels: formValues.labels?.map(l => l.id) ?? []
    }
  })

  const { mutate: editTask, isPending } = useEditTask(closeDialog)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(editedTask =>
          editTask({ path: { taskId }, body: editedTask })
        )}>
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
            defaultValue=''
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
            disabled={isPending || !form.formState.isDirty}>
            Edit
          </PlusButtonWithLoader>
        </div>
      </form>
    </Form>
  )
}
