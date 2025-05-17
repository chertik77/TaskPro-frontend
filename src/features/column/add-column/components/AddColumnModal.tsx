import { useAppForm } from '@/shared/hooks'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Modal,
  PlusButtonWithLoader
} from '@/shared/ui'

import { AddColumnSchema } from '../add-column.contract'
import { useAddColumn } from '../hooks/useAddColumn'

export const AddColumnModal = () => {
  const form = useAppForm(AddColumnSchema, {
    defaultValues: { title: '' }
  })

  const { mutate: addColumn, isPending } = useAddColumn(form.reset)

  return (
    <Modal
      modalTitle='Add column'
      modalDescription='You can add a new column here by adding a title.'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(data => addColumn(data))}
          className='space-y-6'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
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
          <PlusButtonWithLoader
            type='submit'
            shouldShowLoader={isPending}
            disabled={isPending}>
            Add
          </PlusButtonWithLoader>
        </form>
      </Form>
    </Modal>
  )
}
