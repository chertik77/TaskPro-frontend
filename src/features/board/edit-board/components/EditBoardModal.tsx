import { FormBgImageSelector, FormIconSelector } from '@/entities/board'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Modal,
  PlusButtonWithLoader
} from '@/shared/ui'

import { useEditBoard } from '../hooks/useEditBoard'
import { useEditBoardForm } from '../hooks/useEditBoardForm'

export const EditBoardModal = () => {
  const { form, isFormReadyForSubmit } = useEditBoardForm()

  const { mutate: editBoard, isPending } = useEditBoard(form.reset)

  return (
    <Modal
      modalTitle='Edit board'
      modalDescription='You can edit a board here by changing its title, icon and background.'>
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
    </Modal>
  )
}
