import { toast } from 'sonner'

export const handleSuccesToast = (message: string) => toast.success(message)
export const handleErrorToast = (message: string) => toast.error(message)
