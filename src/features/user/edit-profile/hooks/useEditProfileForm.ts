import type { UserTypes } from '@/entities/user'

import { useEffect } from 'react'
import { useModalInstance } from 'react-modal-state'
import { omit } from 'valibot'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'

import { EditUserSchema } from '../edit-profile.contract'

export const useEditProfileForm = () => {
  const { data: initialUser } =
    useModalInstance<UserTypes.EditProfileModalSchema>()

  const form = useAppForm(omit(EditUserSchema, ['avatar']), {
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
