import { useState } from 'react'

import { FormDeadlinePicker, FormPrioritySelector } from '@/entities/card'

import { useAppForm } from '@/shared/hooks'
import {
  Dialog,
  DialogContent,
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

import { AddCardSchema } from '../add-card.contract'
import { useAddCard } from '../hooks/useAddCard'
import { AddCardDialogTrigger } from './AddCardDialogTrigger'

type AddCardDialogProps = {
  columnId: string
}

export const AddCardDialog = ({ columnId }: AddCardDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useAppForm(AddCardSchema, {
    defaultValues: {
      title: '',
      description: '',
      priority: 'Without',
      deadline: new Date()
    }
  })

  const { mutate: addCard, isPending } = useAddCard(
    form.reset,
    columnId,
    setIsDialogOpen
  )

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <AddCardDialogTrigger />
      <DialogContent>
        <DialogTitle>Add card</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(data => addCard(data))}>
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
              disabled={isPending}>
              Add
            </PlusButtonWithLoader>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
