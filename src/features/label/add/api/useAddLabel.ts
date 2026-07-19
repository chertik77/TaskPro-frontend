import { useMutation } from '@tanstack/react-query'

import { labelQueries, useLabelModalStore } from '@/entities/label'

import { createLabelMutation } from '@/shared/api'

export const useAddLabel = (onCreatedLabel: (...event: unknown[]) => void) => {
  const { setModal } = useLabelModalStore()

  return useMutation({
    ...createLabelMutation(),
    meta: {
      invalidates: [labelQueries.lists()],
      errorMessage:
        'An error occurred while adding the label. Please try again shortly.'
    },
    onSuccess(data) {
      setModal({ isOpen: false })
      onCreatedLabel(data)
    }
  })
}
