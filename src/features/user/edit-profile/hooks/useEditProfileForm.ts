import { useEffect } from 'react'
import { omit } from 'valibot'

import { useAuthStore } from '@/entities/auth'
import { UserContracts } from '@/entities/user'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'

export const useEditProfileForm = () => {
  const initialUser = useAuthStore(state => state.user)

  const form = useAppForm(omit(UserContracts.EditUserSchema, ['avatar']), {
    defaultValues: initialUser
  })

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    { name: initialUser.name, email: initialUser.email, password: undefined },
    form.watch,
    ({ password }) => (password ? form.formState.isValid : true)
  )

  const { reset } = form

  useEffect(() => {
    reset(initialUser)
  }, [initialUser, reset])

  return { form, initialUser, isFormReadyForSubmit }
}
