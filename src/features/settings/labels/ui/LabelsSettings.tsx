import { Settings } from '@/entities/setting'

import { Switch } from '@/shared/ui'

import { useGetLabelsSettings } from '../api/useGetLabelsSettings'
import { useUpdateLabelsSettings } from '../api/useUpdateLabelsSettings'
import { LABELS_SETTINGS } from '../config/labels-settings-data'
import { AddLabelDialogButton } from './add/AddLabelDialogButton'
import { LabelsTable } from './LabelsTable'

export const LabelsSettings = () => {
  const { labels, labelSettings, isPending } = useGetLabelsSettings()

  const { mutate: update } = useUpdateLabelsSettings()

  return (
    <Settings
      title='Labels'
      isLoading={isPending}>
      <AddLabelDialogButton />
      <LabelsTable labels={labels} />
      {LABELS_SETTINGS.map(setting => (
        <Settings.Item key={setting.key}>
          <Settings.Content>
            <Settings.Title>{setting.title}</Settings.Title>
            <Settings.Description>{setting.description}</Settings.Description>
          </Settings.Content>
          <Settings.Control>
            {setting.type === 'select' && (
              <Settings.Select
                value={labelSettings?.[setting.key]}
                options={setting.options}
                onChange={value => update({ body: { [setting.key]: value } })}
              />
            )}

            {setting.type === 'switch' && (
              <Switch
                checked={labelSettings?.[setting.key]}
                onCheckedChange={checked =>
                  update({ body: { [setting.key]: checked } })
                }
              />
            )}
          </Settings.Control>
        </Settings.Item>
      ))}
    </Settings>
  )
}
