import type { Dispatch, SetStateAction } from 'react'

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

import { AddColumnSchema } from '../add-column.contract'
import { useAddColumn } from '../hooks/useAddColumn'

type AddColumnFormProps = {
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const AddColumnForm = ({ setIsDialogOpen }: AddColumnFormProps) => {
  const form = useAppForm(AddColumnSchema, {
    defaultValues: { title: '' }
  })

  const { mutate: addColumn, isPending } = useAddColumn(setIsDialogOpen)

  return (
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
  )
}
