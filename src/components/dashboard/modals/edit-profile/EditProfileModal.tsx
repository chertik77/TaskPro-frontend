import type { AxiosError } from 'axios'
import type { User } from 'types'

import { useModal } from 'react-modal-state'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm, useAppMutation } from 'hooks'

import { selectUser, updateUser } from 'redux/user.slice'

import { userService } from 'services'

import { EditUserSchema } from 'lib/schemas'

import { EditAvatar } from './EditAvatar'

export const EditProfileModal = () => {
  const { close } = useModal(EditProfileModal)

  const { name: initialName, email: initialEmail } = useSelector(selectUser)

  const dispatch = useDispatch()

  const { handleSubmit, register, formState, reset, watch } =
    useAppForm<EditUserSchema>(EditUserSchema, {
      defaultValues: { name: initialName, email: initialEmail }
    })

  const { isPending, mutateAsync } = useAppMutation<
    EditUserSchema,
    { user: User }
  >({
    mutationKey: ['editUser'],
    mutationFn: data => userService.updateUserCredentials(data),
    onSuccess(data) {
      dispatch(updateUser(data.user))
    }
  })

  const isFormReadyForSubmit =
    watch('name') !== initialName ||
    watch('email') !== initialEmail ||
    (watch('password') && formState.isValid)

  const submit = (data: EditUserSchema) => {
    toast.promise(mutateAsync(data), {
      loading: 'Updating your profile...',
      success: () => {
        close()
        return 'Profile updated successfully!'
      },
      error: (e: AxiosError) => {
        return e.response?.status === 409
          ? 'User with that email already exists, please try a different one.'
          : 'Failed to update profile. Please try again.'
      }
    })
  }

  return (
    <Modal
      modalTitle='Edit profile'
      onClose={() => {
        reset()
        close()
      }}>
      <form onSubmit={handleSubmit(submit)}>
        <EditAvatar changeUserAvatar={mutateAsync} />
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
          {...register('password', {
            setValueAs: value => (!value ? undefined : value)
          })}
        />
        <Button
          type='submit'
          disabled={isPending || !isFormReadyForSubmit}>
          {isPending ? 'Updating your credentails...' : 'Send'}
        </Button>
      </form>
    </Modal>
  )
}
