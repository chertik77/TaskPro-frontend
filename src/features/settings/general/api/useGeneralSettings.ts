import { useQuery } from '@tanstack/react-query'

import { getAllSettingsOptions } from '@/shared/api'

export const useGeneralSettings = () =>
  useQuery({
    ...getAllSettingsOptions(),
    select: settings => settings.general
  })
