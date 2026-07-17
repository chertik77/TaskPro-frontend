import { useMutation } from '@tanstack/react-query'

import { updateGeneralSettingsMutation } from '@/shared/api'

export const useUpdateGeneralSettings = () =>
  useMutation(updateGeneralSettingsMutation())
