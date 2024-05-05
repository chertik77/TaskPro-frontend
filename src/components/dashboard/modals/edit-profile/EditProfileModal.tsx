import type { SignupSchemaFields } from 'lib/schemas'

import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm } from 'hooks'

import { selectUser } from 'redux/user.slice'

import { signupSchema } from 'lib/schemas'

import { EditAvatar } from './EditAvatar'

export const EditProfileModal = () => {
  // const { close } = useModal('edit-profile-modal')

  const { name, email } = useSelector(selectUser)

  const { handleSubmit, register, formState } = useAppForm<SignupSchemaFields>(
    signupSchema,
    { defaultValues: { name: name ?? '', email: email ?? '' } }
  )

  const { isPending } = useMutation({})

  const submit = () => {
    // mutate(data)
  }

  return (
    <Modal modalTitle='Edit profile'>
      <form onSubmit={handleSubmit(submit)}>
        <EditAvatar />
        <Field
          errors={formState.errors}
          inputName='name'
          placeholder='Enter your name'
          className='mb-default'
          {...register('name')}
        />
        <Field
          errors={formState.errors}
          inputName='email'
          placeholder='Enter your email'
          className='mb-default'
          {...register('email')}
        />
        <Field
          errors={formState.errors}
          inputName='password'
          inputPasswordPlaceholder='Create a password'
          isPasswordInput
          {...register('password')}
        />
        <Button
          type='submit'
          disabled={isPending}>
          {isPending ? 'Updating your credentails...' : 'Send'}
        </Button>
      </form>
    </Modal>
  )
}
