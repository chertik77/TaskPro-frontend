import type { AuthResponse } from 'types'

import { useDispatch, useSelector } from 'react-redux'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm, useAppMutation } from 'hooks'

import { selectUser, updateUser } from 'redux/user.slice'

import { userService } from 'services'

import { OptionalSignupSchema } from 'lib/schemas'

import { EditAvatar } from './EditAvatar'

export const EditProfileModal = () => {
  // const { close } = useModal('edit-profile-modal')

  const { name, email } = useSelector(selectUser)

  const dispatch = useDispatch()

  const { handleSubmit, register, formState } =
    useAppForm<OptionalSignupSchema>(OptionalSignupSchema, {
      defaultValues: { name: name ?? '', email: email ?? '' }
    })

  const { isPending, mutateAsync } = useAppMutation<
    OptionalSignupSchema,
    AuthResponse
  >({
    mutationKey: ['editUser'],
    mutationFn: data => userService.updateUserCredentials(data)
  })

  const submit = (data: OptionalSignupSchema) => {
    mutateAsync(data).then(r => dispatch(updateUser(r.user)))
  }

  return (
    <Modal modalTitle='Edit profile'>
      <form onSubmit={handleSubmit(submit)}>
        <EditAvatar />
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
