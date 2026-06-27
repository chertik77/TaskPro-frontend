import { useAppForm } from '@/shared/lib'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PlusButtonWithLoader
} from '@/shared/ui'

import { useAddLabel } from '../api/useAddLabel'
import { AddLabelSchema } from '../model/contract'

type AddLabelFormProps = {
  name?: string
}

export const AddLabelForm = ({ name }: AddLabelFormProps) => {
  const form = useAppForm(AddLabelSchema, {
    defaultValues: { name: name ?? '', color: 'blue' }
  })

  const { mutate: addLabel, isPending } = useAddLabel()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(data => addLabel(data))}>
        <FormField
          control={form.control}
          name='name'
          render={() => (
            <FormItem className='mb-3.5'>
              <FormLabel className='text-md text-black/50 dark:text-white/50'>
                Name
              </FormLabel>
              <FormControl render={<Input />} />
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name='description'
          render={() => (
            <FormItem className='mb-6'>
              <FormControl render={<TextArea placeholder='Description' />} />
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
          name='labels'
          render={({ field }) => (
            <FormItem className='mb-3.5 space-y-1'>
              <FormLabel className='text-md text-black/50 dark:text-white/50'>
                Labels
              </FormLabel>
              <FormLabelsCombobox {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='deadline'
          render={({ field, fieldState }) => (
            <FormItem className='mb-6 space-y-1'>
              <FormLabel className='text-md text-black/50 dark:text-white/50'>
                Deadline
              </FormLabel>
              <FormDeadlinePicker
                mode='create'
                {...field}
              />
              {fieldState.error ? (
                <FormMessage />
              ) : (
                <FormDescription className='mt-2'>
                  {`This task is due on ${formatDeadlineDate(field.value, 'd MMM yyyy')}.`}
                </FormDescription>
              )}
            </FormItem>
          )}
        /> */}
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
