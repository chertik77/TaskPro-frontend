import { useEffect } from 'react'
import { useEditProfile } from 'features/user/hooks'
import { EditUserSchema } from 'features/user/user.schema'
import { keyof } from 'valibot'

import { Button, Field, Loader, Modal } from 'components/ui'

import { useAppForm } from 'hooks'
import { useAppSelector } from 'hooks/redux'

import { selectUser } from 'redux/user.slice'

import { EditAvatar } from './EditAvatar'

export const EditProfileModal = () => {
  const { name: initialName, email: initialEmail } = useAppSelector(selectUser)

  const { isPending, mutateAsync, mutate } = useEditProfile()

  const { handleSubmit, register, formState, reset } =
    useAppForm(EditUserSchema)

  useEffect(() => {
    reset({ name: initialName, email: initialEmail })
  }, [initialEmail, initialName, reset])

  const isFormReadyForSubmit = keyof(EditUserSchema).options.some(
    f => formState.dirtyFields[f] && formState.isValid
  )

  return (
    <Modal
      modalTitle='Edit profile'
      onAnimationEnd={reset}>
      <form onSubmit={handleSubmit(data => mutate(data))}>
        <EditAvatar changeUserAvatar={mutateAsync} />
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
          disabled={isPending || !isFormReadyForSubmit}>
          {isPending ? <Loader /> : 'Send'}
        </Button>
      </form>
    </Modal>
  )
}
