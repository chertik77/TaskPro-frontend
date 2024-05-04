import type { SignupSchemaFields } from 'lib/schemas'

import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { selectUser } from 'redux/user.slice'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm } from 'hooks'

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
        <div className='mb-[25px] flex justify-center'>
          <EditAvatar />
        </div>
        <Field
          errors={formState.errors}
          inputName='name'
          placeholder='Enter your name'
          className='mb-[14px]'
          {...register('name')}
        />
        <Field
          errors={formState.errors}
          inputName='email'
          placeholder='Enter your email'
          className='mb-[14px]'
          {...register('email')}
        />
        <Field
          errors={formState.errors}
          inputName='password'
          inputPasswordPlaceholder='Create a password'
          isPasswordInput
          autoComplete='current-password'
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
