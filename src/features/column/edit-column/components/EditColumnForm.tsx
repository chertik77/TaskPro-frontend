import type { Dispatch, SetStateAction } from 'react'
import type { EditColumnData } from '../edit-column.types'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  PlusButtonWithLoader
} from '@/shared/ui'

import { useEditColumn } from '../hooks/useEditColumn'
import { useEditColumnForm } from '../hooks/useEditColumnForm'

type EditColumnFormProps = {
  data: EditColumnData
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const EditColumnForm = ({
  data: { columnId, ...formValues },
  setIsDialogOpen
}: EditColumnFormProps) => {
  const { form, isFormReadyForSubmit } = useEditColumnForm(formValues)

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
          disabled={isPending || !isFormReadyForSubmit}>
          Edit
        </PlusButtonWithLoader>
      </form>
    </Form>
  )
}
