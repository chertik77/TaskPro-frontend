import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'
import { useAuthStore } from '@/shared/store'

import { EditUserSchema } from '../edit-profile.contract'

export const useEditProfileForm = () => {
  const {
    user: { name, email }
  } = useAuthStore()

  const form = useAppForm(EditUserSchema, {
    defaultValues: { name, email, password: '' }
  })

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    form.formState.defaultValues!,
    form.watch
  )

  return { form, isFormReadyForSubmit }
}
