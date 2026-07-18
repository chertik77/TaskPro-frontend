import type { GetAllSettingsResponse } from '@/shared/api'

import { useQuery } from '@tanstack/react-query'

import { getAllSettingsOptions } from '@/shared/api'

type SettingsSelect<TData> = (data: GetAllSettingsResponse) => TData

export const useSettings = <TData = GetAllSettingsResponse>(
  select?: SettingsSelect<TData>
) => {
  const { data, isPending } = useQuery({
    ...getAllSettingsOptions(),
    select
  })

  return { data, isPending }
}
