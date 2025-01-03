import { useEffect } from 'react'

import { useEditProfile } from 'features/user/hooks'
import { EditUserSchema } from 'features/user/user.schema'
import { selectUser } from 'features/user/user.slice'

import { Button, Field, Loader, Modal } from 'components/ui'
import { useAppForm, useIsFormReadyForSubmit } from 'hooks'
import { useAppSelector } from 'hooks/redux'

import { EditAvatar } from './EditAvatar'

export const EditProfileModal = () => {
  const { name, email } = useAppSelector(selectUser)

  const { mutate: editProfile, isPending } = useEditProfile()

  const { handleSubmit, register, formState, reset, watch } = useAppForm(
    EditUserSchema,
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
        <Field
          errors={formState.errors}
          inputName='password'
          autoComplete='new-password'
          inputPasswordPlaceholder='Create a password'
          isPasswordInput
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
