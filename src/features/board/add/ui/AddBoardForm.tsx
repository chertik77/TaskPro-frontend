import type { Dispatch, SetStateAction } from 'react'

import { FormBgImageSelector, FormIconSelector } from '@/entities/board'

import { useAppForm } from '@/shared/lib'
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
      <form
        onSubmit={form.handleSubmit(data => addBoard(data))}
        className='space-y-6'>
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
        <PlusButtonWithLoader
          type='submit'
          className='mt-10!'
          shouldShowLoader={isPending}
          disabled={isPending}>
          Create
        </PlusButtonWithLoader>
      </form>
    </Form>
  )
}
