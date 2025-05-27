import type { Dispatch, SetStateAction } from 'react'

import { FormDeadlinePicker, FormPrioritySelector } from '@/entities/card'

import { useAppForm } from '@/shared/hooks'
import {
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

type AddCardFormProps = {
  columnId: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const AddCardForm = ({
  columnId,
  setIsDialogOpen
}: AddCardFormProps) => {
  const form = useAppForm(AddCardSchema, {
    defaultValues: {
      title: '',
      description: '',
      priority: 'Without',
      deadline: new Date()
    }
  })

  const { mutate: addCard, isPending } = useAddCard(columnId, setIsDialogOpen)

  return (
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
              <FormPrioritySelector field={field} />
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
  )
}
