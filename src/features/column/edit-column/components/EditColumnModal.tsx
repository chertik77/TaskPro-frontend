import type { ColumnTypes } from '@/entities/column'

import { useEffect } from 'react'
import { useModalInstance } from 'react-modal-state'

import { ColumnContracts } from '@/entities/column'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Modal,
  PlusButton
} from '@/shared/ui'

import { useEditColumn } from '../hooks/useEditColumn'

export const EditColumnModal = () => {
  const {
    data: { title, id }
  } = useModalInstance<ColumnTypes.EditColumnModalProps>()

  const form = useAppForm(ColumnContracts.ColumnSchema, {
    defaultValues: { title }
  })

  const { mutate: editColumn, isPending } = useEditColumn(form.reset)

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    { title },
    form.watch
  )

  useEffect(() => {
    form.reset({ title })
  }, [form, title])

  return (
    <Modal modalTitle='Edit column'>
      <Form {...form}>
        <form
          className='space-y-6'
          onSubmit={form.handleSubmit(data =>
            editColumn({ columnId: id, data })
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
          <PlusButton
            type='submit'
            shouldShowLoader={isPending}
            disabled={isPending || !isFormReadyForSubmit}>
            Edit
          </PlusButton>
        </form>
      </Form>
    </Modal>
  )
}
