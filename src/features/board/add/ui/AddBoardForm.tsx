import type { Dispatch, SetStateAction } from 'react'

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

import { useAddBoard } from '../api/useAddBoard'
import { AddBoardSchema } from '../model/contract'

type AddBoardFormProps = {
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const AddBoardForm = ({ setIsDialogOpen }: AddBoardFormProps) => {
  const form = useAppForm(AddBoardSchema, {
    defaultValues: { title: '', icon: 'project', background: 'default' }
  })

  const { mutate: addBoard, isPending } = useAddBoard(setIsDialogOpen)

  return (
    <Form {...form}>
      <m.form
        variants={formVariants.container}
        initial='hidden'
        animate='show'
        onSubmit={form.handleSubmit(data => addBoard({ body: data }))}
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
            disabled={isPending}>
            Create
          </PlusButtonWithLoader>
        </m.div>
      </m.form>
    </Form>
  )
}
