import { useMutation } from '@tanstack/react-query'

import { labelQueries, useLabelModalStore } from '@/entities/label'

import { createLabelMutation } from '@/shared/api'
import { isHttpError } from '@/shared/lib'

export const useAddLabel = (
  onCreatedLabel: ((...event: unknown[]) => void) | undefined
) => {
  const { setModal } = useLabelModalStore()

  return useMutation({
    ...createLabelMutation(),
    meta: {
      invalidates: [labelQueries.lists()],
      errorMessage: e => {
        if (isHttpError(e)) {
          return e?.status === 409
            ? 'A label with this name already exists.'
            : 'An error occurred while adding the label. Please try again.'
        }
      }
    },
    onSuccess(data) {
      setModal({ isOpen: false })
      onCreatedLabel?.(data)
    }
  })
}
