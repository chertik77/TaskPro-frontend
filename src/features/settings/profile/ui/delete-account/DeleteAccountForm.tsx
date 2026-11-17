import { useAppForm } from '@/shared/lib'
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
      <form
        onSubmit={form.handleSubmit(({ password }) => deleteAccount(password))}
        className='space-y-6'>
        <div>
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
        </div>
        <div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              type='submit'
              disabled={isPending}
              className='h-10 w-auto flex-1'>
              {isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </AlertDialogFooter>
        </div>
      </form>
    </Form>
  )
}
