import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  getAllSettingsOptions,
  getAllSettingsQueryKey,
  updateGeneralSettingsMutation
} from '@/shared/api'

export const useUpdateGeneralSettings = () => {
  const queryClient = useQueryClient()

  return useMutation({
    ...updateGeneralSettingsMutation(),
    meta: {
      errorMessage: 'We couldn’t update your settings. Please try again'
    },
    onMutate: async ({ body }) => {
      await queryClient.cancelQueries({ queryKey: getAllSettingsQueryKey() })

      const previousSettings = queryClient.getQueryData(
        getAllSettingsQueryKey()
      )

      queryClient.setQueryData(
        getAllSettingsOptions().queryKey,
        oldSettings => {
          if (!oldSettings?.general) return oldSettings

          return {
            ...oldSettings,
            general: { ...oldSettings.general, ...body }
          }
        }
      )

      return { previousSettings }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        getAllSettingsQueryKey(),
        context?.previousSettings
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getAllSettingsQueryKey() })
    }
  })
}
