import * as m from 'motion/react-m'

import { formVariants, useAppForm } from '@/shared/lib'
import {
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

type ChangePasswordFormProps = {
  closeDialog: () => void
}

export const ChangePasswordForm = ({
  closeDialog
}: ChangePasswordFormProps) => {
  const form = useAppForm(ChangePasswordSchema, {
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const { mutate: changePassword, isPending } = useChangePassword(closeDialog)

  return (
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
  )
}
