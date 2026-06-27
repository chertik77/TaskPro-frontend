import { useMutation } from '@tanstack/react-query'

import {
  labelQueries,
  labelService,
  useLabelModalStore
} from '@/entities/label'

export const useAddLabel = (onCreatedLabel: (...event: unknown[]) => void) => {
  const { setModal } = useLabelModalStore()

  return useMutation({
    mutationFn: labelService.addLabel,
    meta: {
      invalidates: [labelQueries.lists()],
      errorMessage:
        'An error occurred while adding the label. Please try again shortly.'
    },
    async onSuccess(data) {
      setModal({ isOpen: false })
      onCreatedLabel(data)
    }
  })
}
