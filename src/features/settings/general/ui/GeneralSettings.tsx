import { Settings, useSettings } from '@/entities/setting'

import { Switch } from '@/shared/ui'

import { useUpdateGeneralSettings } from '../api/useUpdateGeneralSettings'
import { GENERAL_SETTINGS } from '../config/general-settings-data'
import { AccentColorSelect } from './AccentColorSelect'

export const GeneralSettings = () => {
  const { data: generalSettings, isPending } = useSettings(
    select => select.general
  )

  const { mutate: update } = useUpdateGeneralSettings()

  return (
    <Settings
      title='General'
      isLoading={isPending}>
      {GENERAL_SETTINGS.map(setting => (
        <Settings.Item key={setting.key}>
          <Settings.Content>
            <Settings.Title>{setting.title}</Settings.Title>
            <Settings.Description>{setting.description}</Settings.Description>
          </Settings.Content>
          <Settings.Control>
            {setting.type === 'select' && (
              <Settings.Select
                value={generalSettings?.[setting.key]}
                options={setting.options}
                onChange={value => update({ body: { [setting.key]: value } })}
              />
            )}

            {setting.type === 'switch' && (
              <Switch
                checked={generalSettings?.[setting.key]}
                onCheckedChange={checked =>
                  update({ body: { [setting.key]: checked } })
                }
              />
            )}

            {setting.type === 'custom' && (
              <AccentColorSelect
                value={generalSettings?.accentColor}
                onChange={value => update({ body: { accentColor: value! } })}
              />
            )}
          </Settings.Control>
        </Settings.Item>
      ))}
    </Settings>
  )
}
