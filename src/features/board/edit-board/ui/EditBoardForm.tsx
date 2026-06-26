import type { Dispatch, SetStateAction } from 'react'
import type { EditBoardData } from '../model/types'

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
      <form
        onSubmit={form.handleSubmit(editedBoard => editBoard(editedBoard))}
        className='space-y-6'>
        <FormField
          control={form.control}
          name='title'
          render={() => (
            <FormItem>
              <FormControl
                render={<Input />}
                placeholder='Title'
              />
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
              <FormIconSelector {...field} />
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
              <FormBgImageSelector {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <PlusButtonWithLoader
          type='submit'
          className='mt-10!'
          shouldShowLoader={isPending}
          disabled={isPending || !form.formState.isDirty}>
          Edit
        </PlusButtonWithLoader>
      </form>
    </Form>
  )
}
