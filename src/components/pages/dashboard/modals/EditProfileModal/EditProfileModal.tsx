import { Button, Field } from 'components/ui'
import { Modal } from 'components/ui/modal/Modal'
import { useAppForm } from 'hooks'
import {
  signupSchema,
  type SignupSchemaFields
} from 'lib/schemas/signup-schema'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { useEffect } from 'react'
import { useModal } from 'react-modal-state'
import { useSelector } from 'react-redux'
import { useUserMutation } from 'redux/api/user'
import { selectUser } from 'redux/slices/user/user-slice'
import { EditAvatar } from './EditAvatar'

export const EditProfileModal = () => {
  const { close } = useModal('edit-profile-modal')
  const { name, email } = useSelector(selectUser)
  const [user, { isLoading, isError, isSuccess, data, error }] =
    useUserMutation()

  const { handleSubmit, register, errors, isValid } =
    useAppForm<SignupSchemaFields>(signupSchema, {
      defaultValues: {
        name: name || '',
        email: email || '',
        password: ''
      }
    })

  useEffect(() => {
    if (isSuccess) {
      close()
      handleSuccessToast(
        `Congrats, ${data?.user.name}! Data changed successfully`
      )
    }
    if (isError && error && 'status' in error)
      handleErrorToast(
        error?.status === 409
          ? 'User with this email already exists. Please try different email.'
          : 'Something went wrong. Please try again.'
      )
  }, [isError, isSuccess])

  return (
    <Modal modalTitle='Edit profile' size='sm'>
      <form onSubmit={handleSubmit(data => user(data))}>
        <div className='mb-[25px] flex justify-center'>
          <EditAvatar />
        </div>
        <Field
          errors={errors}
          inputName='name'
          placeholder='Enter your name'
          className='mb-[14px]'
          {...register('name')}
        />
        <Field
          errors={errors}
          inputName='email'
          placeholder='Enter your email'
          className='mb-[14px]'
          {...register('email')}
        />
        <Field
          errors={errors}
          inputName='password'
          inputPasswordPlaceholder='Create a password'
          isPasswordInput
          autoComplete='new-password'
          {...register('password')}
        />
        <Button type='submit' disabled={!isValid}>
          {isLoading ? 'Loading...' : 'Send'}
        </Button>
      </form>
    </Modal>
  )
}
