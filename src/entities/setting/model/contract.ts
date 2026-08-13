import * as v from 'valibot'

import { vGeneralSettings, vLabelSettings, vTaskSettings } from '@/shared/api'

export const SettingsSchema = v.object({
  general: vGeneralSettings,
  task: vTaskSettings,
  label: vLabelSettings
})
