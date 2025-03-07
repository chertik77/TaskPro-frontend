import { ColumnContracts } from '@/entities/column'

import { useAppForm } from '@/shared/hooks'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Modal,
  PlusButton
} from '@/shared/ui'

import { useAddColumn } from '../hooks/useAddColumn'

export const AddColumnModal = () => {
  const form = useAppForm(ColumnContracts.ColumnSchema, {
    defaultValues: { title: '' }
  })

  const { mutate: addColumn, isPending } = useAddColumn(form.reset)

  return (
    <Modal modalTitle='Add column'>
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
          <PlusButton
            type='submit'
            shouldShowLoader={isPending}
            disabled={isPending}>
            Add
          </PlusButton>
        </form>
      </Form>
    </Modal>
  )
}
