import { useMutation, useQueryClient } from '@tanstack/react-query'

import { boardQueries } from '@/entities/board'
import { labelQueries } from '@/entities/label'

import { deleteLabelMutation } from '@/shared/api'
import { setOptimisticData } from '@/shared/lib'

export const useDeleteLabel = () => {
  const queryClient = useQueryClient()

  const allLabelsQueryKey = labelQueries.list().queryKey

  return useMutation({
    ...deleteLabelMutation(),
    meta: {
      errorMessage:
        'An error occurred while deleting the label. Please try again.'
    },
    onMutate: ({ path: { labelId } }) =>
      setOptimisticData(queryClient, allLabelsQueryKey, labels =>
        labels.filter(l => l.id !== labelId)
      ),
    onError: (_, __, context) => context?.rollback(),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: allLabelsQueryKey })
      queryClient.invalidateQueries({ queryKey: boardQueries.lists() })
      queryClient.invalidateQueries({ queryKey: boardQueries.details() })
    }
  })
}
