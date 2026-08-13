import * as m from 'motion/react-m'

import { formVariants, useAppForm } from '@/shared/lib'
import {
  AlertDialogCancel,
  AlertDialogFooter,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  PasswordInput
} from '@/shared/ui'

import { useDeleteAccount } from '../../api/useDeleteAccount'
import { DeleteAccountSchema } from '../../model/contract'

type DeleteAccountFormProps = {
  closeDialog: () => void
}

export const DeleteAccountForm = ({ closeDialog }: DeleteAccountFormProps) => {
  const form = useAppForm(DeleteAccountSchema, {
    defaultValues: { password: '' }
  })

  const { mutate: deleteAccount, isPending } = useDeleteAccount(closeDialog)

  return (
    <Form {...form}>
      <m.form
        variants={formVariants.container}
        initial='hidden'
        animate='show'
        onSubmit={form.handleSubmit(({ password }) => deleteAccount(password))}
        className='space-y-6'>
        <m.div variants={formVariants.field}>
          <FormField
            control={form.control}
            name='password'
            render={() => (
              <FormItem>
                <FormLabel>Confirm your password</FormLabel>
                <FormControl render={<PasswordInput />} />
                <FormMessage />
              </FormItem>
            )}
          />
        </m.div>
        <m.div variants={formVariants.field}>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              type='submit'
              disabled={isPending}
              className='h-10 w-auto flex-1'>
              {isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </AlertDialogFooter>
        </m.div>
      </m.form>
    </Form>
  )
}
