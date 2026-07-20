import { useMutation, useQueryClient } from '@tanstack/react-query'
import { array, parse } from 'valibot'

import { boardQueries } from '@/entities/board'
import { labelQueries } from '@/entities/label'

import { deleteLabelMutation, vLabel } from '@/shared/api'

export const useDeleteLabel = () => {
  const queryClient = useQueryClient()

  const allLabelsQueryKey = labelQueries.lists()

  return useMutation({
    ...deleteLabelMutation(),
    meta: {
      errorMessage:
        'An error occurred while deleting the label. Please try again.'
    },
    onMutate: async ({ path: { labelId } }) => {
      await queryClient.cancelQueries({ queryKey: allLabelsQueryKey })

      const previousLabels = queryClient.getQueryData(allLabelsQueryKey)

      const parsedPreviousLabels = parse(array(vLabel), previousLabels)

      queryClient.setQueryData(allLabelsQueryKey, oldLabels => {
        if (!oldLabels) return oldLabels

        const parsedOldLabels = parse(array(vLabel), oldLabels)

        return parsedOldLabels.filter(l => l.id !== labelId)
      })

      return { previousLabels: parsedPreviousLabels }
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
