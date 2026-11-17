import { FormBgImageSelector, FormIconSelector } from '@/entities/board'

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

import { useAddBoard } from '../api/useAddBoard'
import { AddBoardSchema } from '../model/contract'

type AddBoardFormProps = {
  closeDialog: () => void
}

export const AddBoardForm = ({ closeDialog }: AddBoardFormProps) => {
  const form = useAppForm(AddBoardSchema, {
    defaultValues: { title: '', icon: 'sparkles', background: 'default' }
  })

  const { mutate: addBoard, isPending } = useAddBoard(closeDialog)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data => addBoard({ body: data }))}
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
          <FormField
            control={form.control}
            name='icon'
            render={() => (
              <FormItem>
                <FormLabel>Icons</FormLabel>
                <FormIconSelector />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name='background'
            render={() => (
              <FormItem className='space-y-3'>
                <FormLabel>Background</FormLabel>
                <FormBgImageSelector />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <PlusButtonWithLoader
            type='submit'
            className='mt-10!'
            shouldShowLoader={isPending}
            disabled={isPending}>
            Create
          </PlusButtonWithLoader>
        </div>
      </form>
    </Form>
  )
}
