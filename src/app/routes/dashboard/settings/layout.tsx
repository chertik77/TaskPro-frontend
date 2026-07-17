import { SettingsPage } from '@/pages/settings'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/settings')({
  component: SettingsPage
  // loader: async () => await queryClient.ensureQueryData(getAllSettingsOptions())
})
