import { useState } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Loader,
  PasswordInput
} from '@/shared/ui'

import { useEditProfile } from '../hooks/useEditProfile'
import { useEditProfileForm } from '../hooks/useEditProfileForm'
import { EditAvatar } from './EditAvatar'
import { EditProfileDialogTrigger } from './EditProfileDialogTrigger'

export const EditProfileDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { form, isFormReadyForSubmit } = useEditProfileForm()

  const { mutate: editProfile, isPending } = useEditProfile(setIsDialogOpen)

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <EditProfileDialogTrigger />
      <DialogContent onCloseAutoFocus={() => form.reset()}>
        <DialogTitle>Edit profile</DialogTitle>
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
                      autoFocus
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
              disabled={isPending || !isFormReadyForSubmit}>
              {isPending ? <Loader /> : 'Send'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
