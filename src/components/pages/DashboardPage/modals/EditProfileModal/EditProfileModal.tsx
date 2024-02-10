import { Modal } from 'components/ui/modal/Modal'
import { useSelector } from 'react-redux'
import { selectUser } from 'redux/slices/user/user-slice'
import { Button, Field } from 'components/ui'
import { useEditProfileForm } from 'hooks'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { useEffect } from 'react'
import { useUserMutation } from 'redux/api/user'
import { useModal } from 'react-modal-state'
import { EditAvatar } from './EditAvatar'

export const EditProfileModal = () => {
  const { close } = useModal('edit-profile-modal')
  const { name, email } = useSelector(selectUser)
  const editProfileFormData = localStorage.getItem('edit-profile-form')
  const userName = editProfileFormData
    ? JSON.parse(editProfileFormData).name
    : name
  const userEmail = editProfileFormData
    ? JSON.parse(editProfileFormData).email
    : email

  const signUpFormData = localStorage.getItem('sign-up-form')
  const signInFormData = localStorage.getItem('sign-in-form')
  const userPassword = editProfileFormData
    ? JSON.parse(editProfileFormData).password
    : signInFormData
      ? JSON.parse(signInFormData).password
      : signUpFormData
        ? JSON.parse(signUpFormData).password
        : ''
  const [user, { isLoading, isError, isSuccess, data, error }] =
    useUserMutation()
  const { handleSubmit, register, errors, isValid } = useEditProfileForm({
    defaultValues: {
      name: userName || '',
      email: userEmail || '',
      password: userPassword || ''
    }
  })

  useEffect(() => {
    if (isSuccess) {
      close()
      handleSuccessToast(
        `Welcome, ${data?.user.name}! Data changed successfully`
      )
    }
    if (isError && error && 'status' in error)
      handleErrorToast(
        error?.status === 409
          ? 'User with this email already exists. Please try different email.'
          : 'Something went wrong during registration. Please try again.'
      )
  }, [isError, isSuccess])

  return (
    <Modal modalTitle='Edit profile' size='sm'>
      <div className='mb-[25px] flex justify-center'>
        <EditAvatar />
      </div>
      <form onSubmit={handleSubmit(data => user(data))}>
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
          {...register('password')}
        />
        <Button type='submit' disabled={!isValid}>
          {isLoading ? 'Loading...' : 'Send'}
        </Button>
      </form>
    </Modal>
  )
}
