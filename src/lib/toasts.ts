import { toast } from 'sonner'

export const handleSuccessToast = (message: string) => toast.success(message)
export const handleErrorToast = (message: string) => toast.error(message)
