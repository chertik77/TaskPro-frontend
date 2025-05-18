import type { CardTypes } from '@/entities/card'

import { useState } from 'react'

import { FormDeadlinePicker, FormPrioritySelector } from '@/entities/card'

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
  PlusButtonWithLoader,
  TextArea
} from '@/shared/ui'

import { useEditCard } from '../hooks/useEditCard'
import { useEditCardForm } from '../hooks/useEditCardForm'
import { EditCardDialogTrigger } from './EditCardDialogTrigger'

type EditCardDialogProps = {
  data: CardTypes.EditCardModalSchema
}

export const EditCardDialog = ({ data }: EditCardDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { form, initialCard, isFormReadyForSubmit } = useEditCardForm(data)

  const { mutate: editCard, isPending } = useEditCard(
    form.reset,
    setIsDialogOpen
  )

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <EditCardDialogTrigger />
      <DialogContent onCloseAutoFocus={() => form.reset()}>
        <DialogTitle>Edit card</DialogTitle>
        <DialogDescription className='sr-only'>
          You can edit a card here by changing its title, description, priority
          and deadline.
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(data =>
              editCard({ cardId: initialCard.id, ...data })
            )}>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='mb-3.5'>
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
              name='description'
              render={({ field }) => (
                <FormItem className='mb-6'>
                  <FormControl>
                    <TextArea
                      placeholder='Description'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='priority'
              render={({ field }) => (
                <FormItem className='mb-3.5 space-y-1'>
                  <FormLabel className='text-md text-black/50 dark:text-white/50'>
                    Priority
                  </FormLabel>
                  <FormControl>
                    <FormPrioritySelector field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='deadline'
              render={({ field }) => (
                <FormItem className='mb-6 space-y-1'>
                  <FormLabel className='text-md text-black/50 dark:text-white/50'>
                    Deadline
                  </FormLabel>
                  <FormDeadlinePicker field={field} />
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
