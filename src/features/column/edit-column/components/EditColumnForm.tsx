import type { ColumnTypes } from '@/entities/column'
import type { Dispatch, SetStateAction } from 'react'

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
  data: ColumnTypes.EditColumnModalSchema
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const EditColumnForm = ({
  data,
  setIsDialogOpen
}: EditColumnFormProps) => {
  const { form, isFormReadyForSubmit } = useEditColumnForm(data)

  const { mutate: editColumn, isPending } = useEditColumn(setIsDialogOpen)

  return (
    <Form {...form}>
      <form
        className='space-y-6'
        onSubmit={form.handleSubmit(editedColumn =>
          editColumn({ columnId: data.id, ...editedColumn })
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
