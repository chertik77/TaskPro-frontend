import type { EditBoardData } from '../model/types'

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

import { useEditBoard } from '../api/useEditBoard'
import { EditBoardSchema } from '../model/contract'

type EditBoardFormProps = {
  data: EditBoardData
  closeDialog: () => void
}
export const EditBoardForm = ({
  data: formValues,
  closeDialog
}: EditBoardFormProps) => {
  const form = useAppForm(EditBoardSchema, {
    defaultValues: {
      ...formValues,
      background: formValues.background ?? 'default'
    }
  })

  const { mutate: editBoard, isPending } = useEditBoard(closeDialog)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(editedBoard => editBoard(editedBoard))}
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
            disabled={isPending || !form.formState.isDirty}>
            Edit
          </PlusButtonWithLoader>
        </div>
      </form>
    </Form>
  )
}
