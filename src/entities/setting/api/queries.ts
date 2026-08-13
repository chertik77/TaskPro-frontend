import type { GetAllSettingsResponse } from '@/shared/api'

import { queryOptions } from '@tanstack/react-query'

import { getAllSettings } from '@/shared/api'

type SettingListOptions<T> = {
  select?: (data: GetAllSettingsResponse) => T
}

export const settingQueries = {
  all: () => ['settings'],
  lists: () => [...settingQueries.all(), 'list'],
  list: <T>(options?: SettingListOptions<T>) =>
    queryOptions({
      queryKey: settingQueries.lists(),
      queryFn: async () => (await getAllSettings()).data,
      staleTime: Infinity,
      gcTime: Infinity,
      select: options?.select
    })
}
