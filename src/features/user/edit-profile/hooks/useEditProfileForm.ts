import { useEffect } from 'react'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'
import { useAuthStore } from '@/shared/store'

import { EditUserSchema } from '../edit-profile.contract'

export const useEditProfileForm = () => {
  const initialUser = useAuthStore(state => state.user)

  const form = useAppForm(EditUserSchema, {
    shouldUnregister: false
  })

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    { ...initialUser, password: '' },
    form.watch,
    ({ password }) => (password ? form.formState.isValid : true)
  )

  const { reset } = form

  useEffect(() => {
    reset({ ...initialUser, password: '' })
  }, [initialUser, reset])

  return { form, initialUser, isFormReadyForSubmit }
}
