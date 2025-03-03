import { useEffect } from 'react'
import { useModalInstance } from 'react-modal-state'
import { omit } from 'valibot'

import { UserContracts, UserTypes } from '@/entities/user'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'

export const useEditProfileForm = () => {
  const { data: initialUser } =
    useModalInstance<UserTypes.EditProfileModalProps>()

  const form = useAppForm(omit(UserContracts.EditUserSchema, ['avatar']), {
    shouldUnregister: false
  })

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    { ...initialUser, password: undefined },
    form.watch,
    ({ password }) => (password ? form.formState.isValid : true)
  )

  const { reset } = form

  useEffect(() => {
    reset(initialUser)
  }, [initialUser, reset])

  return { form, initialUser, isFormReadyForSubmit }
}
