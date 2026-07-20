import type { Label } from '@/shared/api'
import type { Dispatch, SetStateAction } from 'react'

import { LabelColorPicker } from '@/entities/label'

import { useAppForm } from '@/shared/lib'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PlusButtonWithLoader,
  TextArea
} from '@/shared/ui'

import { useEditLabel } from '../../api/useEditLabel'
import { EditLabelSchema } from '../../model/contract'

type EditLabelFormProps = {
  formData: Pick<Label, 'id' | 'name' | 'color' | 'description'>
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const EditLabelForm = ({
  formData: { name, color, description, id },
  setIsDialogOpen
}: EditLabelFormProps) => {
  const form = useAppForm(EditLabelSchema, {
    defaultValues: { name, color, description: description ?? '' }
  })

  const { mutate: editLabel, isPending } = useEditLabel(setIsDialogOpen)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data =>
          editLabel({ path: { labelId: id }, body: data })
        )}>
        <FormField
          control={form.control}
          name='name'
          render={() => (
            <FormItem className='mb-3.5'>
              <FormLabel className='text-md text-black/50 dark:text-white/50'>
                Name
              </FormLabel>
              <FormControl render={<Input />} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='color'
          render={() => (
            <FormItem className='mb-3.5'>
              <FormLabel className='text-md text-black/50 dark:text-white/50'>
                Color
              </FormLabel>
              <LabelColorPicker />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={() => (
            <FormItem className='mb-6'>
              <FormLabel className='text-md text-black/50 dark:text-white/50'>
                Description
              </FormLabel>
              <FormControl
                render={<TextArea />}
                className='h-30'
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <PlusButtonWithLoader
          type='submit'
          shouldShowLoader={isPending}
          disabled={isPending || !form.formState.isDirty}>
          Edit
        </PlusButtonWithLoader>
      </form>
    </Form>
  )
}
