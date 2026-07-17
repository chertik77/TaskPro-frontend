import { useQuery } from '@tanstack/react-query'

import { getAllSettingsOptions } from '@/shared/api'

export const useSettings = () => {
  const { data: settings } = useQuery(getAllSettingsOptions())

  return settings
}
