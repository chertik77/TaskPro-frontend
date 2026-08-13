import { createFileRoute } from '@tanstack/react-router'

import { TaskSettings } from '@/features/settings/task'

export const Route = createFileRoute('/dashboard/settings/task')({
  component: TaskSettings
})
