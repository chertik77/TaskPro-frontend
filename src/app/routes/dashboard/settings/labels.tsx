import { createFileRoute } from '@tanstack/react-router'

import { LabelsSettings } from '@/features/settings/labels'

export const Route = createFileRoute('/dashboard/settings/labels')({
  component: LabelsSettings
})
