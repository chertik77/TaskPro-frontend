import { createFileRoute } from '@tanstack/react-router'

import { SecuritySettings } from '@/features/settings/security'

export const Route = createFileRoute('/dashboard/settings/security')({
  component: SecuritySettings
})
