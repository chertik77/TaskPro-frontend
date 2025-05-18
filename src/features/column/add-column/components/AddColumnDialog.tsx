import { useState } from 'react'

import { useAppForm } from '@/shared/hooks'
import {
  Dialog,
  DialogContent,
  DialogTitle,
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
import { AddColumnDialogTrigger } from './AddColumnDialogTrigger'

export const AddColumnDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useAppForm(AddColumnSchema, {
    defaultValues: { title: '' }
  })

  const { mutate: addColumn, isPending } = useAddColumn(
    form.reset,
    setIsDialogOpen
  )

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <AddColumnDialogTrigger />
      <DialogContent>
        <DialogTitle>Add column</DialogTitle>
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
      </DialogContent>
    </Dialog>
  )
}
