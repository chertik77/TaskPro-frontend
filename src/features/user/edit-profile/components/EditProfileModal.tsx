import { useEffect } from 'react'
import { omit } from 'valibot'

import { useAuthStore } from '@/entities/auth'
import { UserContracts } from '@/entities/user'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Loader,
  Modal,
  PasswordInput
} from '@/shared/ui'

import { useEditProfile } from '../hooks/useEditProfile'
import { EditAvatar } from './EditAvatar'

export const EditProfileModal = () => {
  const { name, email } = useAuthStore(state => state.user)

  const { mutate: editProfile, isPending } = useEditProfile()

  const form = useAppForm(omit(UserContracts.EditUserSchema, ['avatar']), {
    defaultValues: { name, email }
  })

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    { name, email, password: undefined },
    form.watch,
    ({ password }) => (password ? form.formState.isValid : true)
  )

  useEffect(() => {
    form.reset({ name, email })
  }, [email, form, name])

  return (
    <Modal modalTitle='Edit profile'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(data => editProfile(data))}
          className='space-y-3.5'>
          <EditAvatar changeUserAvatar={editProfile} />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Enter your name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Enter your email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    autoComplete='new-password'
                    placeholder='Create a password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='!mt-6'
            disabled={
              isPending || !form.formState.isValid || !isFormReadyForSubmit
            }>
            {isPending ? <Loader /> : 'Send'}
          </Button>
        </form>
      </Form>
    </Modal>
  )
}
