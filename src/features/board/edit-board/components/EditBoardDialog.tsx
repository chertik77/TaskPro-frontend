import type { BoardTypes } from '@/entities/board'

import { useState } from 'react'

import { FormBgImageSelector, FormIconSelector } from '@/entities/board'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PlusButtonWithLoader
} from '@/shared/ui'

import { useEditBoard } from '../hooks/useEditBoard'
import { useEditBoardForm } from '../hooks/useEditBoardForm'
import { EditBoardDialogTrigger } from './EditBoardDialogTrigger'

type EditBoardDialogProps = {
  data: BoardTypes.EditBoardModalSchema
}

export const EditBoardDialog = ({ data }: EditBoardDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { form, isFormReadyForSubmit } = useEditBoardForm(data)

  const { mutate: editBoard, isPending } = useEditBoard(
    form.reset,
    setIsDialogOpen
  )

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <EditBoardDialogTrigger />
      <DialogContent onCloseAutoFocus={() => form.reset()}>
        <DialogTitle>Edit board</DialogTitle>
        <DialogDescription className='sr-only'>
          You can edit a board here by changing its title, icon and background.
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(data => editBoard(data))}
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
            <FormField
              control={form.control}
              name='icon'
              render={({ field }) => (
                <FormItem className='space-y-3.5'>
                  <FormLabel>Icons</FormLabel>
                  <FormControl>
                    <FormIconSelector field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='background'
              render={({ field }) => (
                <FormItem className='space-y-3.5'>
                  <FormLabel>Background</FormLabel>
                  <FormControl>
                    <FormBgImageSelector field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PlusButtonWithLoader
              type='submit'
              className='!mt-10'
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
