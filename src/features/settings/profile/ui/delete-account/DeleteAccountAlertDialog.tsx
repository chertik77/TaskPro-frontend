import { useState } from 'react'
import * as m from 'motion/react-m'

import { formVariants, useAppForm } from '@/shared/lib'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
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

type DeleteAccountAlertDialogProps = {
  hasPassword: boolean
}

export const DeleteAccountAlertDialog = ({
  hasPassword
}: DeleteAccountAlertDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useAppForm(DeleteAccountSchema, {
    shouldUnregister: true,
    defaultValues: { password: '' }
  })

  const { mutate: deleteAccount, isPending } = useDeleteAccount(() =>
    setIsDialogOpen(false)
  )

  return (
    <AlertDialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger
        className='focus-visible:styled-outline hocus:text-red ml-auto shrink-0
          cursor-pointer transition-colors'>
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Delete account?</AlertDialogTitle>
        <AlertDialogDescription className='mb-6'>
          Your boards, columns, tasks and labels will be permanently deleted.
          This cannot be undone.
        </AlertDialogDescription>
        {hasPassword ? (
          <Form {...form}>
            <m.form
              variants={formVariants.container}
              initial='hidden'
              animate='show'
              onSubmit={form.handleSubmit(({ password }) =>
                deleteAccount(password)
              )}
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
        ) : (
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={() => deleteAccount(undefined)}>
              {isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
