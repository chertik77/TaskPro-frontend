import * as m from 'motion/react-m'

import { formVariants, useAppForm } from '@/shared/lib'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  PlusButtonWithLoader
} from '@/shared/ui'

import { useUpdatePasskey } from '../../api/useUpdatePasskey'
import { AddPasskeyNameSchema } from '../../model/contract'
import { usePasskeyDialogStore } from '../../model/passkey-dialog.store'

export const AddPasskeyNameDialog = ({ passkeyId }: { passkeyId: string }) => {
  const { isOpen, setIsOpen } = usePasskeyDialogStore()

  const form = useAppForm(AddPasskeyNameSchema, {
    defaultValues: { name: 'Passkey' }
  })

  const { mutate: updatePasskey, isPending } = useUpdatePasskey(() =>
    setIsOpen(false)
  )

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={() => setIsOpen(false)}>
      <AlertDialogContent>
        <AlertDialogTitle>New passkey added</AlertDialogTitle>
        <AlertDialogDescription className='mb-6'>
          Give this passkey a name so you can easily recognize it when managing
          your security settings.
        </AlertDialogDescription>
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
      </AlertDialogContent>
    </AlertDialog>
  )
}
