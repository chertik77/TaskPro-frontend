import type { ColumnTypes } from '@/entities/column'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
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
import { EditColumnDialogTrigger } from './EditColumnDialogTrigger'

type EditColumnDialogProps = {
  data: ColumnTypes.EditColumnModalSchema
}

export const EditColumnDialog = ({ data }: EditColumnDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { form, initialColumn, isFormReadyForSubmit } = useEditColumnForm(data)

  const { mutate: editColumn, isPending } = useEditColumn(
    form.reset,
    setIsDialogOpen
  )

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <EditColumnDialogTrigger />
      <DialogContent onCloseAutoFocus={() => form.reset()}>
        <DialogTitle>Edit column</DialogTitle>
        <DialogDescription className='sr-only'>
          You can edit a column here by changing its title.
        </DialogDescription>
        <Form {...form}>
          <form
            className='space-y-6'
            onSubmit={form.handleSubmit(data =>
              editColumn({ columnId: initialColumn.id, ...data })
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
      </DialogContent>
    </Dialog>
  )
}
