import { useMe } from '@/entities/user'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/lib'

import { EditUserSchema } from '../model/contract'

export const useEditProfileForm = () => {
  const { name, email } = useMe()

  const form = useAppForm(EditUserSchema, {
    defaultValues: { name, email, password: '' }
  })

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    form.formState.defaultValues!,
    form.watch
  )

  return { form, isFormReadyForSubmit }
}
