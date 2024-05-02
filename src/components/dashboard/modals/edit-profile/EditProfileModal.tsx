import type { SignupSchemaFields } from 'lib/schemas'

import { useModal } from 'react-modal-state'
import { useSelector } from 'react-redux'
import { useUserMutation } from 'redux/api/user'
import { selectUser } from 'redux/slices/user/user-slice'
import { toast } from 'sonner'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm } from 'hooks'

import { signupSchema } from 'lib/schemas'

import { EditAvatar } from './EditAvatar'

export const EditProfileModal = () => {
  const [user, { isLoading }] = useUserMutation()
  const { close } = useModal('edit-profile-modal')
  const { name, email } = useSelector(selectUser)
  const { handleSubmit, register, formState } = useAppForm<SignupSchemaFields>(
    signupSchema,
    {
      defaultValues: {
        name: name || '',
        email: email || '',
        password: ''
      }
    }
  )

  const submit = (data: SignupSchemaFields) => {
    user(data)
      .unwrap()
      .then(r => {
        close()
        toast.success(
          `Congrats, ${r?.user?.name}! Your details have been changed successfully.`
        )
      })
      .catch(e => {
        toast.error(
          e?.status === 409
            ? 'User with this email already exists. Please try different email.'
            : 'Something went wrong while updating your profile. Please check your details and try again.'
        )
      })
  }

  return (
    <Modal
      modalTitle='Edit profile'
      size='sm'>
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
          disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Send'}
        </Button>
      </form>
    </Modal>
  )
}
