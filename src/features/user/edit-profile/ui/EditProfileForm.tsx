import type { Dispatch, SetStateAction } from 'react'

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Loader,
  PasswordInput
} from '@/shared/ui'

import { useEditProfile } from '../api/useEditProfile'
import { useEditProfileForm } from '../lib/useEditProfileForm'

type EditProfileFormProps = {
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const EditProfileForm = ({ setIsDialogOpen }: EditProfileFormProps) => {
  const { form } = useEditProfileForm()

  const { mutate: editProfile, isPending } = useEditProfile(setIsDialogOpen)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data => editProfile(data))}
        className='space-y-3.5'>
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
        <FormField
          control={form.control}
          name='email'
          render={() => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl render={<Input />} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={() => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl
                render={<PasswordInput />}
                autoComplete='new-password'
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='mt-6!'
          disabled={
            isPending || !form.formState.isDirty || !form.formState.isValid
          }>
          {isPending ? <Loader /> : 'Send'}
        </Button>
      </form>
    </Form>
  )
}
