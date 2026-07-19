import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parse } from 'valibot'

import { settingQueries, SettingsContracts } from '@/entities/setting'

import { updateTaskSettingsMutation } from '@/shared/api'

export const useUpdateTaskSettings = () => {
  const queryClient = useQueryClient()

  const allSettinsQueryKey = settingQueries.lists()

  return useMutation({
    ...updateTaskSettingsMutation(),
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
          task: { ...parsedOldSettings.task, ...body }
        }
      })

      return { previousSettings: parsedPreviousSettings }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(allSettinsQueryKey, context?.previousSettings)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: allSettinsQueryKey })
    }
  })
}
