import { useState } from 'react'
import * as m from 'motion/react-m'

import { formVariants, useAppForm } from '@/shared/lib'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  PasswordInput,
  PlusButtonWithLoader
} from '@/shared/ui'

import { useChangePassword } from '../../api/useChangePassword'
import { ChangePasswordSchema } from '../../model/contract'

const PASSWORD_FIELDS = [
  { name: 'currentPassword', label: 'Current password' },
  { name: 'newPassword', label: 'New password' },
  { name: 'confirmPassword', label: 'Confirm new password' }
] as const

export const ChangePasswordDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useAppForm(ChangePasswordSchema, {
    shouldUnregister: true,
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const { mutate: changePassword, isPending } = useChangePassword(() =>
    setIsDialogOpen(false)
  )

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        className='focus-visible:styled-outline hocus:text-accent ml-auto
          cursor-pointer transition-colors'>
        Change
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Change password</DialogTitle>
        <DialogDescription className='mb-6'>
          You’ll stay signed in on this device. Every other device will be
          signed out.
        </DialogDescription>
        <Form {...form}>
          <m.form
            variants={formVariants.container}
            initial='hidden'
            animate='show'
            onSubmit={form.handleSubmit(data => changePassword(data))}
            className='space-y-6'>
            {PASSWORD_FIELDS.map(({ name, label }) => (
              <m.div
                key={name}
                variants={formVariants.field}>
                <FormField
                  control={form.control}
                  name={name}
                  render={() => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl render={<PasswordInput />} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </m.div>
            ))}
            <m.div variants={formVariants.field}>
              <PlusButtonWithLoader
                type='submit'
                shouldShowLoader={isPending}
                disabled={isPending}>
                Update
              </PlusButtonWithLoader>
            </m.div>
          </m.form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
