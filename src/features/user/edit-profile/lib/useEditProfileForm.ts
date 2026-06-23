import { useMe } from '@/entities/user'

import { useAppForm } from '@/shared/lib'

import { EditUserSchema } from '../model/contract'

export const useEditProfileForm = () => {
  const user = useMe()

  const form = useAppForm(EditUserSchema, {
    defaultValues: { name: user?.name, email: user?.email, password: '' }
  })

  return { form }
}
