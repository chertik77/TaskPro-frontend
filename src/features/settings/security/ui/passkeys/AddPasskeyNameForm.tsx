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

type AddPasskeyNameFormProps = {
  passkeyId: string
  closeDialog: () => void
}

export const AddPasskeyNameForm = ({
  passkeyId,
  closeDialog
}: AddPasskeyNameFormProps) => {
  const form = useAppForm(PasskeyNameSchema, {
    defaultValues: { name: 'Passkey' }
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
            disabled={isPending}>
            Done
          </PlusButtonWithLoader>
        </div>
      </form>
    </Form>
  )
}
