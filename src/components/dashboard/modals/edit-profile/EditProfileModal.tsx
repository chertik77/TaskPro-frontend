import { useEffect } from 'react'
import { useModal } from 'react-modal-state'
import { useSelector } from 'react-redux'

import { Button, Field, Loader, Modal } from 'components/ui'

import { useAppForm } from 'hooks'
import { useEditProfile } from 'hooks/user'

import { selectUser } from 'redux/user.slice'

import { EditUserSchema } from 'lib/schemas'

import { EditAvatar } from './EditAvatar'

export const EditProfileModal = () => {
  const { close } = useModal(EditProfileModal)

  const { name: initialName, email: initialEmail } = useSelector(selectUser)

  const { isPending, mutateAsync, mutate } = useEditProfile()

  const { handleSubmit, register, formState, reset, watch } =
    useAppForm(EditUserSchema)

  useEffect(() => {
    reset({ name: initialName, email: initialEmail })
  }, [initialEmail, initialName, reset])

  const isFormReadyForSubmit =
    watch('name') !== initialName ||
    watch('email') !== initialEmail ||
    (watch('password') && formState.isValid)

  return (
    <Modal
      modalTitle='Edit profile'
      focusTrapped={false}
      onClose={() => {
        reset()
        close()
      }}>
      <form onSubmit={handleSubmit(data => mutate(data))}>
        <EditAvatar changeUserAvatar={mutateAsync} />
        <Field
          errors={formState.errors}
          inputName='name'
          placeholder='Enter your name'
          {...register('name')}
        />
        <Field
          errors={formState.errors}
          inputName='email'
          placeholder='Enter your email'
          {...register('email')}
        />
        <Field
          errors={formState.errors}
          inputName='password'
          autoComplete='new-password'
          inputPasswordPlaceholder='Create a password'
          isPasswordInput
          {...register('password', {
            setValueAs: value => (!value ? undefined : value)
          })}
        />
        <Button
          type='submit'
          disabled={isPending || !isFormReadyForSubmit}>
          {isPending ? <Loader /> : 'Send'}
        </Button>
      </form>
    </Modal>
  )
}
