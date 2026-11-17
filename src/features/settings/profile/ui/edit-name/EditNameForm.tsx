import { useMe } from '@/entities/user'

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

import { useUpdateName } from '../../api/useUpdateName'
import { NameSchema } from '../../model/contract'

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
      <form
        onSubmit={form.handleSubmit(data => updateName(data))}
        className='space-y-6'>
        <div>
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
        </div>
        <div>
          <PlusButtonWithLoader
            type='submit'
            shouldShowLoader={isPending}
            disabled={isPending || !form.formState.isDirty}>
            Edit
          </PlusButtonWithLoader>
        </div>
      </form>
    </Form>
  )
}
