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

import { useAddColumn } from '../api/useAddColumn'
import { AddColumnSchema } from '../model/contract'

type AddColumnFormProps = {
  closeDialog: () => void
}

export const AddColumnForm = ({ closeDialog }: AddColumnFormProps) => {
  const form = useAppForm(AddColumnSchema, {
    defaultValues: { title: '' }
  })

  const { mutate: addColumn, isPending } = useAddColumn(closeDialog)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data => addColumn(data))}
        className='space-y-6'>
        <div>
          <FormField
            control={form.control}
            name='title'
            render={() => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl render={<Input />} />
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
