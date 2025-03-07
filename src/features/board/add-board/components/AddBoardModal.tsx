import {
  BoardContracts,
  FormBgImageSelector,
  FormIconSelector
} from '@/entities/board'

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
  PlusButton
} from '@/shared/ui'

import { useAddBoard } from '../hooks/useAddBoard'

export const AddBoardModal = () => {
  const form = useAppForm(BoardContracts.BoardSchema, {
    defaultValues: { title: '', icon: 'project', background: 'default' }
  })

  const { mutate: addBoard, isPending } = useAddBoard(form.reset)

  return (
    <Modal modalTitle='New board'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(data => addBoard(data))}
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
          <PlusButton
            type='submit'
            className='!mt-10'
            shouldShowLoader={isPending}
            disabled={isPending}>
            Create
          </PlusButton>
        </form>
      </Form>
    </Modal>
  )
}
