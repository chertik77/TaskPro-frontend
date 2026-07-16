import { AppearanceSettings } from '@/pages/settings/ui/AppeeranceSettings'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/settings/appearance')({
  component: AppearanceSettings
})
