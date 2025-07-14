import type { Dispatch, SetStateAction } from 'react'
import type { EditCardData } from '../model/types'

import { FormDeadlinePicker, FormPrioritySelector } from '@/entities/card'

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

import { useEditCard } from '../api/useEditCard'
import { useEditCardForm } from '../lib/useEditCardForm'

type EditCardFormProps = {
  data: EditCardData
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const EditCardForm = ({
  data: { cardId, formValues },
  setIsDialogOpen
}: EditCardFormProps) => {
  const { form, isFormReadyForSubmit } = useEditCardForm(formValues)

  const { mutate: editCard, isPending } = useEditCard(setIsDialogOpen)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(editedCard =>
          editCard({ cardId, ...editedCard })
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
              <FormPrioritySelector {...field} />
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
              <FormDeadlinePicker {...field} />
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
