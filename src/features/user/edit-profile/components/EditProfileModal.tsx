import { useEffect } from 'react'

import { useAuthStore } from '@/entities/auth'
import { UserContracts } from '@/entities/user'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'
import { Button, Field, Loader, Modal, PasswordField } from '@/shared/ui'

import { useEditProfile } from '../hooks/useEditProfile'
import { EditAvatar } from './EditAvatar'

export const EditProfileModal = () => {
  const { name, email } = useAuthStore(state => state.user)

  const { mutate: editProfile, isPending } = useEditProfile()

  const { handleSubmit, register, formState, reset, watch } = useAppForm(
    UserContracts.EditUserSchema,
    { shouldUnregister: false }
  )

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    { name, email, password: undefined },
    watch,
    ({ password }) => (password ? formState.isValid : true)
  )

  useEffect(() => {
    reset({ name, email })
  }, [email, name, reset])

  return (
    <Modal modalTitle='Edit profile'>
      <form onSubmit={handleSubmit(data => editProfile(data))}>
        <EditAvatar changeUserAvatar={editProfile} />
        <Field
          errors={formState.errors}
          inputName='name'
          placeholder='Enter your name'
          {...register('name', { setValueAs: value => value.trim() })}
        />
        <Field
          errors={formState.errors}
          inputName='email'
          placeholder='Enter your email'
          {...register('email', { setValueAs: value => value.trim() })}
        />
        <PasswordField
          errors={formState.errors}
          autoComplete='new-password'
          placeholder='Create a password'
          {...register('password', {
            setValueAs: value => (!value ? undefined : value.trim())
          })}
        />
        <Button
          type='submit'
          disabled={isPending || !formState.isValid || !isFormReadyForSubmit}>
          {isPending ? <Loader /> : 'Send'}
        </Button>
      </form>
    </Modal>
  )
}
