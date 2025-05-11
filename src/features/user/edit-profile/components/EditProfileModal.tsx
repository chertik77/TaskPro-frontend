import { useRef } from 'react'

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
import { useEditProfileForm } from '../hooks/useEditProfileForm'
import { EditAvatar } from './EditAvatar'

export const EditProfileModal = () => {
  const { form, isFormReadyForSubmit } = useEditProfileForm()

  const { mutate: editProfile, isPending } = useEditProfile()

  const initialFocusRef = useRef<HTMLInputElement>(null!)

  return (
    <Modal
      modalTitle='Edit profile'
      initialFocusRef={initialFocusRef}>
      <EditAvatar changeUserAvatar={editProfile} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(data => editProfile(data))}
          className='space-y-3.5'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Enter your name'
                    {...field}
                    ref={initialFocusRef}
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
            disabled={isPending || !isFormReadyForSubmit}>
            {isPending ? <Loader /> : 'Send'}
          </Button>
        </form>
      </Form>
    </Modal>
  )
}
