import { useQueries } from '@tanstack/react-query'

import { labelQueries } from '@/entities/label'
import { settingQueries } from '@/entities/setting'

export const useGetLabelsSettings = () =>
  useQueries({
    queries: [
      labelQueries.list(),
      settingQueries.list({ select: settings => settings.label })
    ],
    combine: results => ({
      labels: results[0].data,
      labelSettings: results[1].data,
      isPending: results.some(result => result.isPending)
    })
  })
