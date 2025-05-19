import type { UserDtoTypes } from '@/shared/api/user'
import type { UseMutateFunction } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { EditUserSchema } from '../edit-profile.contract'

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Loader,
  PasswordInput
} from '@/shared/ui'

import { useEditProfileForm } from '../hooks/useEditProfileForm'

type EditProfileFormProps = {
  editProfile: UseMutateFunction<
    EditUserSchema,
    AxiosError,
    UserDtoTypes.EditUserDto
  >
  isPending: boolean
}

export const EditProfileForm = ({
  editProfile,
  isPending
}: EditProfileFormProps) => {
  const { form, isFormReadyForSubmit } = useEditProfileForm()

  return (
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
  )
}
