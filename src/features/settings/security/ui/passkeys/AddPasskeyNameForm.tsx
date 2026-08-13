import { getAuthenticatorName } from '@better-auth/passkey'
import * as m from 'motion/react-m'

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

import { useUpdatePasskey } from '../../api/useUpdatePasskey'
import { PasskeyNameSchema } from '../../model/contract'

type AddPasskeyNameFormProps = {
  passkeyId: string
  passkeyAaguid: string | null | undefined
  closeDialog: () => void
}

export const AddPasskeyNameForm = ({
  passkeyId,
  passkeyAaguid,
  closeDialog
}: AddPasskeyNameFormProps) => {
  const form = useAppForm(PasskeyNameSchema, {
    defaultValues: { name: getAuthenticatorName(passkeyAaguid) ?? 'Passkey' }
  })

  const { mutate: updatePasskey, isPending } = useUpdatePasskey(closeDialog)

  return (
    <Form {...form}>
      <m.form
        variants={formVariants.container}
        initial='hidden'
        animate='show'
        onSubmit={form.handleSubmit(data =>
          updatePasskey({ id: passkeyId, ...data })
        )}
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
            disabled={isPending}>
            Done
          </PlusButtonWithLoader>
        </m.div>
      </m.form>
    </Form>
  )
}
