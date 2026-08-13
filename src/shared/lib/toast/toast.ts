import type { ReactNode } from 'react'

import { Toast } from '@base-ui/react/toast'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

type ToastOptions = {
  description?: ReactNode
  duration?: number
}

export const toastManager = Toast.createToastManager()

const createToast =
  (type: ToastType) => (title: ReactNode, options?: ToastOptions) =>
    toastManager.add({
      type,
      title,
      description: options?.description,
      timeout: options?.duration
    })

export const toast = {
  success: createToast('success'),
  error: createToast('error'),
  info: createToast('info'),
  warning: createToast('warning')
}
