import { FormDeadlinePicker, FormPrioritySelector } from '@/entities/card'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Modal,
  PlusButtonWithLoader,
  TextArea
} from '@/shared/ui'

import { useEditCard } from '../hooks/useEditCard'
import { useEditCardForm } from '../hooks/useEditCardForm'

export const EditCardModal = () => {
  const { form, initialCard, isFormReadyForSubmit } = useEditCardForm()

  const { mutate: editCard, isPending } = useEditCard(form.reset)

  return (
    <Modal
      modalTitle='Edit card'
      modalDescription='You can edit a card here by changing its title, description, priority and deadline.'>
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
    </Modal>
  )
}
