import type { Dispatch, SetStateAction } from 'react'
import type { EditBoardData } from '../model/types'

import * as m from 'motion/react-m'

import { FormBgImageSelector, FormIconSelector } from '@/entities/board'

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

import { useEditBoard } from '../api/useEditBoard'
import { EditBoardSchema } from '../model/contract'

type EditBoardFormProps = {
  data: EditBoardData
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}
export const EditBoardForm = ({
  data: formValues,
  setIsDialogOpen
}: EditBoardFormProps) => {
  const form = useAppForm(EditBoardSchema, {
    defaultValues: {
      ...formValues,
      background: formValues.background ?? 'default'
    }
  })

  const { mutate: editBoard, isPending } = useEditBoard(setIsDialogOpen)

  return (
    <Form {...form}>
      <m.form
        variants={formVariants.container}
        initial='hidden'
        animate='show'
        onSubmit={form.handleSubmit(editedBoard => editBoard(editedBoard))}
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
          <FormField
            control={form.control}
            name='icon'
            render={() => (
              <FormItem>
                <FormLabel>Icons</FormLabel>
                <FormIconSelector />
                <FormMessage />
              </FormItem>
            )}
          />
        </m.div>
        <m.div variants={formVariants.field}>
          <FormField
            control={form.control}
            name='background'
            render={() => (
              <FormItem className='space-y-3'>
                <FormLabel>Background</FormLabel>
                <FormBgImageSelector />
                <FormMessage />
              </FormItem>
            )}
          />
        </m.div>
        <m.div variants={formVariants.field}>
          <PlusButtonWithLoader
            type='submit'
            className='mt-10!'
            shouldShowLoader={isPending}
            disabled={isPending || !form.formState.isDirty}>
            Edit
          </PlusButtonWithLoader>
        </m.div>
      </m.form>
    </Form>
  )
}
