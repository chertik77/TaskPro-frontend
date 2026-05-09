import { useMe } from '@/entities/user'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/lib'

import { EditUserSchema } from '../model/contract'

export const useEditProfileForm = () => {
  const user = useMe()

  const formValues = { name: user?.name, email: user?.email, password: '' }

  const form = useAppForm(EditUserSchema, {
    defaultValues: formValues
  })

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit(
    formValues,
    form.watch
  )

  return { form, isFormReadyForSubmit }
}
