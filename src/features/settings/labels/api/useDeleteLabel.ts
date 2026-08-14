import { useMutation, useQueryClient } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'
import { labelQueries } from '@/entities/label'

import { deleteLabelMutation } from '@/shared/api'

export const useDeleteLabel = () => {
  const queryClient = useQueryClient()

  const allLabelsQueryKey = labelQueries.list().queryKey

  return useMutation({
    ...deleteLabelMutation(),
    meta: {
      errorMessage:
        'An error occurred while deleting the label. Please try again.'
    },
    onMutate: async ({ path: { labelId } }) => {
      await queryClient.cancelQueries({ queryKey: allLabelsQueryKey })

      const previousLabels = queryClient.getQueryData(allLabelsQueryKey)

      queryClient.setQueryData(allLabelsQueryKey, oldLabels =>
        oldLabels?.filter(l => l.id !== labelId)
      )

      return { previousLabels }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(allLabelsQueryKey, context?.previousLabels)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: allLabelsQueryKey })
      queryClient.invalidateQueries({ queryKey: boardQueries.lists() })
      queryClient.invalidateQueries({ queryKey: boardQueries.details() })
    }
  })
}
