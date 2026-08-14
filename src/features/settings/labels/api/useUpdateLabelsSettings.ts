import { useMutation, useQueryClient } from '@tanstack/react-query'

import { settingQueries } from '@/entities/setting'

import { updateLabelSettingsMutation } from '@/shared/api'

export const useUpdateLabelsSettings = () => {
  const queryClient = useQueryClient()

  const allSettinsQueryKey = settingQueries.list().queryKey

  return useMutation({
    ...updateLabelSettingsMutation(),
    meta: {
      errorMessage: 'We couldn’t update your settings. Please try again'
    },
    onMutate: async ({ body }) => {
      await queryClient.cancelQueries({ queryKey: allSettinsQueryKey })

      const previousSettings = queryClient.getQueryData(allSettinsQueryKey)

      queryClient.setQueryData(allSettinsQueryKey, oldSettings =>
        oldSettings
          ? { ...oldSettings, label: { ...oldSettings.label, ...body } }
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
