import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Modal,
  PlusButtonWithLoader
} from '@/shared/ui'

import { useEditColumn } from '../hooks/useEditColumn'
import { useEditColumnForm } from '../hooks/useEditColumnForm'

export const EditColumnModal = () => {
  const { form, initialColumn, isFormReadyForSubmit } = useEditColumnForm()

  const { mutate: editColumn, isPending } = useEditColumn(form.reset)

  return (
    <Modal
      modalTitle='Edit column'
      modalDescription='You can edit a column here by changing its title.'>
      <Form {...form}>
        <form
          className='space-y-6'
          onSubmit={form.handleSubmit(data =>
            editColumn({ columnId: initialColumn.id, ...data })
          )}>
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
