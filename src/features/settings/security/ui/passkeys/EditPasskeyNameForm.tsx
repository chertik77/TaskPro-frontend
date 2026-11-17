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

import { useUpdatePasskey } from '../../api/useUpdatePasskey'
import { PasskeyNameSchema } from '../../model/contract'

type EditPasskeyNameFormProps = {
  passkeyId: string
  name: string
  closeDialog: () => void
}

export const EditPasskeyNameForm = ({
  passkeyId,
  name,
  closeDialog
}: EditPasskeyNameFormProps) => {
  const form = useAppForm(PasskeyNameSchema, {
    defaultValues: { name }
  })

  const { mutate: updatePasskey, isPending } = useUpdatePasskey(closeDialog)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data =>
          updatePasskey({ id: passkeyId, ...data })
        )}
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
