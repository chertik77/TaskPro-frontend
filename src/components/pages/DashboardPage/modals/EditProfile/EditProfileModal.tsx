import { Modal } from 'components/ui/modal/Modal'
import { useSelector } from 'react-redux'
import { selectUser } from 'redux/slices/user/user-slice'
import { Button, Field } from 'components/ui'
import { useSignupForm } from 'hooks'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { useEffect } from 'react'
import { useUserMutation } from 'redux/api/user'

export const EditProfileModal = () => {
  const { name, email, avatarURL } = useSelector(selectUser)
  const [user, { isLoading, isError, isSuccess, data, error }] =
    useUserMutation()
  const { handleSubmit, register, errors, isValid, reset } = useSignupForm()

  useEffect(() => {
    if (isSuccess) {
      reset()
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
      <div
        style={{ backgroundImage: `url(${avatarURL?.url})` }}
        className='relative mx-auto mb-[25px] size-[68px] rounded-lg bg-cover bg-center'>
        <button className='absolute bottom-[-12px] left-[22px] size-6 rounded-lg bg-brand'>
          +
        </button>
      </div>
      <form onSubmit={handleSubmit(data => user(data))}>
        <Field
          errors={errors}
          inputName='name'
          value={name || ''}
          placeholder='Enter your name'
          className='mb-[14px]'
          {...register('name')}
        />
        <Field
          errors={errors}
          inputName='email'
          value={email || ''}
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
