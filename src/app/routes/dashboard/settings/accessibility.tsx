import { AccessibilitySettings } from '@/pages/settings'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/settings/accessibility')({
  component: AccessibilitySettings
})
