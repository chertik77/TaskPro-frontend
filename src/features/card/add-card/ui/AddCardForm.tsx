import type { Dispatch, SetStateAction } from 'react'

import { useMemo } from 'react'
import { addDays } from 'date-fns'

import {
  formatDeadlineDate,
  FormDeadlinePicker,
  FormPrioritySelector
} from '@/entities/card'

import { useAppForm } from '@/shared/lib'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PlusButtonWithLoader,
  TextArea
} from '@/shared/ui'

import { useAddCard } from '../api/useAddCard'
import { AddCardSchema } from '../model/contract'

type AddCardFormProps = {
  columnId: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const AddCardForm = ({
  columnId,
  setIsDialogOpen
}: AddCardFormProps) => {
  const deadline = useMemo(() => addDays(new Date(), 1), [])

  const form = useAppForm(AddCardSchema, {
    defaultValues: {
      title: '',
      description: '',
      priority: 'Without',
      deadline
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
              <FormPrioritySelector {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='deadline'
          render={({ field, fieldState }) => (
            <FormItem className='mb-6 space-y-1'>
              <FormLabel className='text-md text-black/50 dark:text-white/50'>
                Deadline
              </FormLabel>
              <FormDeadlinePicker
                mode='create'
                {...field}
              />
              {fieldState.error ? (
                <FormMessage />
              ) : (
                <FormDescription className='mt-2'>
                  {`This card is due on ${formatDeadlineDate(field.value, 'd MMM yyyy')}.`}
                </FormDescription>
              )}
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
