import type { GetAllSettingsResponse } from '@/shared/api'

import { useQuery } from '@tanstack/react-query'

import { settingQueries } from '../api/queries'

type SettingsSelect<TData> = (data: GetAllSettingsResponse) => TData

export const useSettings = <TData = GetAllSettingsResponse>(
  select?: SettingsSelect<TData>
) => {
  const { data, isPending } = useQuery({
    ...settingQueries.list(),
    select
  })

  return { data, isPending }
}
