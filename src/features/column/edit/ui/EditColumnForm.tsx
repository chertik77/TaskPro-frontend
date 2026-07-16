import type { Dispatch, SetStateAction } from 'react'
import type { EditColumnData } from '../model/types'

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

import { useEditColumn } from '../api/useEditColumn'
import { EditColumnSchema } from '../model/contract'

type EditColumnFormProps = {
  data: EditColumnData
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const EditColumnForm = ({
  data: { columnId, formValues },
  setIsDialogOpen
}: EditColumnFormProps) => {
  const form = useAppForm(EditColumnSchema, {
    defaultValues: formValues
  })

  const { mutate: editColumn, isPending } = useEditColumn(setIsDialogOpen)

  return (
    <Form {...form}>
      <m.form
        variants={formVariants.container}
        initial='hidden'
        animate='show'
        className='space-y-6'
        onSubmit={form.handleSubmit(editedColumn =>
          editColumn({ path: { columnId }, body: editedColumn })
        )}>
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
            disabled={isPending || !form.formState.isDirty}>
            Edit
          </PlusButtonWithLoader>
        </m.div>
      </m.form>
    </Form>
  )
}
