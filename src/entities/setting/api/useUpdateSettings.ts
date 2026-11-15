import type {
  UpdateGeneralSettingsData,
  UpdateLabelSettingsData,
  UpdateTaskSettingsData
} from '@/shared/api'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  updateGeneralSettings,
  updateLabelSettings,
  updateTaskSettings
} from '@/shared/api'
import { setOptimisticData } from '@/shared/lib'

import { settingQueries } from './queries'

type SectionBody = {
  general: UpdateGeneralSettingsData['body']
  task: UpdateTaskSettingsData['body']
  label: UpdateLabelSettingsData['body']
}

type SettingsSection = keyof SectionBody

const SECTION_UPDATERS: {
  [S in SettingsSection]: (body: SectionBody[S]) => Promise<unknown>
} = {
  general: body => updateGeneralSettings({ body }),
  task: body => updateTaskSettings({ body }),
  label: body => updateLabelSettings({ body })
}

export const useUpdateSettings = <S extends SettingsSection>(section: S) => {
  const queryClient = useQueryClient()

  const allSettingsQueryKey = settingQueries.list().queryKey

  return useMutation({
    mutationFn: ({ body }: { body: SectionBody[S] }) =>
      SECTION_UPDATERS[section](body),
    meta: {
      errorMessage: 'We couldn’t update your settings. Please try again.'
    },
    onMutate: ({ body }) =>
      setOptimisticData(queryClient, allSettingsQueryKey, settings => ({
        ...settings,
        [section]: { ...settings[section], ...body }
      })),
    onError: (_, __, context) => context?.rollback(),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: allSettingsQueryKey })
    }
  })
}
