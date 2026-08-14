import { useMutation, useQueryClient } from '@tanstack/react-query'

import { settingQueries } from '@/entities/setting'

import { updateGeneralSettingsMutation } from '@/shared/api'

export const useUpdateGeneralSettings = () => {
  const queryClient = useQueryClient()

  const allSettinsQueryKey = settingQueries.list().queryKey

  return useMutation({
    ...updateGeneralSettingsMutation(),
    meta: {
      errorMessage: 'We couldn’t update your settings. Please try again.'
    },
    onMutate: async ({ body }) => {
      await queryClient.cancelQueries({ queryKey: allSettinsQueryKey })

      const previousSettings = queryClient.getQueryData(allSettinsQueryKey)

      queryClient.setQueryData(allSettinsQueryKey, oldSettings =>
        oldSettings
          ? { ...oldSettings, general: { ...oldSettings.general, ...body } }
          : oldSettings
      )

      return { previousSettings }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(allSettinsQueryKey, context?.previousSettings)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: allSettinsQueryKey })
    }
  })
}
