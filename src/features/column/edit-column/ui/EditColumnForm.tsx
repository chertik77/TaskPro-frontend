import type { Dispatch, SetStateAction } from 'react'
import type { EditColumnData } from '../model/types'

import { useAppForm } from '@/shared/lib'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  PlusButtonWithLoader
} from '@/shared/ui'

import { useEditColumn } from '../api/useEditColumn'
import { EditColumnSchema } from '../model/contract'

type EditColumnFormProps = {
  data: EditColumnData
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const EditColumnForm = ({
  data: { columnId, formValues },
  setIsDialogOpen
}: EditColumnFormProps) => {
  const form = useAppForm(EditColumnSchema, {
    defaultValues: formValues
  })

  const { mutate: editColumn, isPending } = useEditColumn(setIsDialogOpen)

  return (
    <Form {...form}>
      <form
        className='space-y-6'
        onSubmit={form.handleSubmit(editedColumn =>
          editColumn({ columnId, ...editedColumn })
        )}>
        <FormField
          control={form.control}
          name='title'
          render={() => (
            <FormItem>
              <FormControl
                render={<Input />}
                placeholder='Title'
              />
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
