import * as m from 'motion/react-m'

import { formVariants, useAppForm } from '@/shared/lib'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PlusButtonWithLoader
} from '@/shared/ui'

import { useAddColumn } from '../api/useAddColumn'
import { AddColumnSchema } from '../model/contract'

type AddColumnFormProps = {
  closeDialog: () => void
}

export const AddColumnForm = ({ closeDialog }: AddColumnFormProps) => {
  const form = useAppForm(AddColumnSchema, {
    defaultValues: { title: '' }
  })

  const { mutate: addColumn, isPending } = useAddColumn(closeDialog)

  return (
    <Form {...form}>
      <m.form
        variants={formVariants.container}
        initial='hidden'
        animate='show'
        onSubmit={form.handleSubmit(data => addColumn(data))}
        className='space-y-6'>
        <m.div variants={formVariants.field}>
          <FormField
            control={form.control}
            name='title'
            render={() => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl render={<Input />} />
                <FormMessage />
              </FormItem>
            )}
          />
        </m.div>
        <m.div variants={formVariants.field}>
          <PlusButtonWithLoader
            type='submit'
            shouldShowLoader={isPending}
            disabled={isPending}>
            Add
          </PlusButtonWithLoader>
        </m.div>
      </m.form>
    </Form>
  )
}
