import type { LabelModalProps } from '@/entities/label'

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
  PlusButtonWithLoader
} from '@/shared/ui'

import { useAddLabel } from '../../api/useAddLabel'
import { AddLabelSchema } from '../../model/contract'

type AddLabelFormProps = {
  name?: LabelModalProps['name']
  onCreatedLabel?: LabelModalProps['onCreated']
}

export const AddLabelForm = ({ name, onCreatedLabel }: AddLabelFormProps) => {
  const form = useAppForm(AddLabelSchema, {
    defaultValues: { name: name ?? '', color: 'blue' }
  })

  const { mutate: addLabel, isPending } = useAddLabel(onCreatedLabel)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(data => addLabel({ body: data }))}>
        <div>
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
        </div>
        <div>
          <FormField
            control={form.control}
            name='color'
            render={() => (
              <FormItem className='mb-6'>
                <FormLabel className='text-md text-black/50 dark:text-white/50'>
                  Color
                </FormLabel>
                <LabelColorPicker />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <PlusButtonWithLoader
            type='submit'
            shouldShowLoader={isPending}
            disabled={isPending}>
            Add
          </PlusButtonWithLoader>
        </div>
      </form>
    </Form>
  )
}
