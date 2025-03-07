import {
  CardContracts,
  FormDeadlinePicker,
  FormPrioritySelector
} from '@/entities/card'

import { useAppForm } from '@/shared/hooks'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Modal,
  PlusButton,
  TextArea
} from '@/shared/ui'

import { useAddCard } from '../hooks/useAddCard'

export const AddCardModal = () => {
  const form = useAppForm(CardContracts.CardSchema, {
    defaultValues: {
      title: '',
      description: '',
      priority: 'Without',
      deadline: new Date()
    }
  })

  const { mutate: addCard, isPending } = useAddCard(form.reset)

  return (
    <Modal modalTitle='Add card'>
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
                  Label color
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
          <PlusButton
            type='submit'
            shouldShowLoader={isPending}
            disabled={isPending}>
            Add
          </PlusButton>
        </form>
      </Form>
    </Modal>
  )
}
