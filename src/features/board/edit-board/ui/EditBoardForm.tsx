import type { Dispatch, SetStateAction } from 'react'
import type { EditBoardData } from '../model/types'

import { FormBgImageSelector, FormIconSelector } from '@/entities/board'

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
import { useEditBoardForm } from '../lib/useEditBoardForm'

type EditBoardFormProps = {
  data: EditBoardData
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const EditBoardForm = ({
  data,
  setIsDialogOpen
}: EditBoardFormProps) => {
  const { form, isFormReadyForSubmit } = useEditBoardForm(data)

  const { mutate: editBoard, isPending } = useEditBoard(setIsDialogOpen)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(editedBoard => editBoard(editedBoard))}
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
          disabled={isPending || !isFormReadyForSubmit}>
          Edit
        </PlusButtonWithLoader>
      </form>
    </Form>
  )
}
