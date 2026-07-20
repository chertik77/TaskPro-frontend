import * as m from 'motion/react-m'

import { LabelColorPicker } from '@/entities/label'

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

import { useAddLabel } from '../../api/useAddLabel'
import { AddLabelSchema } from '../../model/contract'

type AddLabelFormProps = {
  name?: string
  onCreatedLabel?: (...event: unknown[]) => void
}

export const AddLabelForm = ({ name, onCreatedLabel }: AddLabelFormProps) => {
  const form = useAppForm(AddLabelSchema, {
    defaultValues: { name: name ?? '', color: 'blue' }
  })

  const { mutate: addLabel, isPending } = useAddLabel(onCreatedLabel)

  return (
    <Form {...form}>
      <m.form
        variants={formVariants.container}
        initial='hidden'
        animate='show'
        onSubmit={form.handleSubmit(data => addLabel({ body: data }))}>
        <m.div variants={formVariants.field}>
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
        </m.div>
        <m.div variants={formVariants.field}>
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
