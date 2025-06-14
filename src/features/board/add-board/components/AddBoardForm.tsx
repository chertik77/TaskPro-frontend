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

import { AddBoardSchema } from '../add-board.contract'
import { useAddBoard } from '../hooks/useAddBoard'

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
              <FormIconSelector field={field} />
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
              <FormBgImageSelector field={field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <PlusButtonWithLoader
          type='submit'
          className='!mt-10'
          shouldShowLoader={isPending}
          disabled={isPending}>
          Create
        </PlusButtonWithLoader>
      </form>
    </Form>
  )
}
