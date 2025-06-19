import { useSessionStore } from '@/entities/session'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/lib'

import { EditUserSchema } from '../edit-profile.contract'

export const useEditProfileForm = () => {
  const {
    user: { name, email }
  } = useSessionStore()

  const form = useAppForm(EditUserSchema, {
    defaultValues: { name, email, password: '' }
  })

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    form.formState.defaultValues!,
    form.watch
  )

  return { form, isFormReadyForSubmit }
}
