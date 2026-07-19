import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parse } from 'valibot'

import { settingQueries, SettingsContracts } from '@/entities/setting'

import {
  getAllSettingsQueryKey,
  updateGeneralSettingsMutation
} from '@/shared/api'

export const useUpdateGeneralSettings = () => {
  const queryClient = useQueryClient()

  const allSettinsQueryKey = settingQueries.lists()

  return useMutation({
    ...updateGeneralSettingsMutation(),
    meta: {
      errorMessage: 'We couldn’t update your settings. Please try again'
    },
    onMutate: async ({ body }) => {
      await queryClient.cancelQueries({ queryKey: allSettinsQueryKey })

      const previousSettings = queryClient.getQueryData(allSettinsQueryKey)

      const parsedPreviousSettings = parse(
        SettingsContracts.SettingsSchema,
        previousSettings
      )

      queryClient.setQueryData(allSettinsQueryKey, oldSettings => {
        if (!oldSettings) return oldSettings

        const parsedOldSettings = parse(
          SettingsContracts.SettingsSchema,
          oldSettings
        )

        return {
          ...parsedOldSettings,
          general: { ...parsedOldSettings.general, ...body }
        }
      })

      return { previousSettings: parsedPreviousSettings }
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
