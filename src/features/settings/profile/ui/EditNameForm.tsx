import * as m from 'motion/react-m'

import { useMe } from '@/entities/user'

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

import { useUpdateName } from '../api/useUpdateName'
import { NameSchema } from '../model/contract'

type EditNameFormProps = {
  closeDialog: () => void
}

export const EditNameForm = ({ closeDialog }: EditNameFormProps) => {
  const user = useMe()

  const form = useAppForm(NameSchema, {
    defaultValues: { name: user?.name ?? '' }
  })

  const { mutate: updateName, isPending } = useUpdateName(closeDialog)

  return (
    <Form {...form}>
      <m.form
        variants={formVariants.container}
        initial='hidden'
        animate='show'
        onSubmit={form.handleSubmit(data => updateName(data))}
        className='space-y-6'>
        <m.div variants={formVariants.field}>
          <FormField
            control={form.control}
            name='name'
            render={() => (
              <FormItem>
                <FormLabel>Name</FormLabel>
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
