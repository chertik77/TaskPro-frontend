import { Settings, useSettings } from '@/entities/setting'

import { Switch } from '@/shared/ui'

import { useUpdateTaskSettings } from '../api/useUpdateTaskSettings'
import { TASK_SETTINGS } from '../config/task-settings-data'
import { DefaultPrioritySelect } from './DefaultPrioritySelect'

export const TaskSettings = () => {
  const { data: taskSettings, isPending } = useSettings(select => select.task)

  const { mutate: update } = useUpdateTaskSettings()

  return (
    <Settings
      title='Task Preferences'
      isLoading={isPending}>
      {TASK_SETTINGS.map(setting => (
        <Settings.Item key={setting.key}>
          <Settings.Content>
            <Settings.Title>{setting.title}</Settings.Title>
            <Settings.Description>{setting.description}</Settings.Description>
          </Settings.Content>
          <Settings.Control>
            {setting.type === 'select' && (
              <Settings.Select
                value={taskSettings?.[setting.key]}
                options={setting.options}
                onChange={value => update({ body: { [setting.key]: value } })}
              />
            )}

            {setting.type === 'switch' && (
              <Switch
                checked={taskSettings?.[setting.key]}
                onCheckedChange={checked =>
                  update({ body: { [setting.key]: checked } })
                }
              />
            )}

            {setting.type === 'custom' && setting.key === 'defaultPriority' && (
              <DefaultPrioritySelect
                value={taskSettings?.defaultPriority}
                onChange={value =>
                  update({ body: { defaultPriority: value! } })
                }
              />
            )}
          </Settings.Control>
        </Settings.Item>
      ))}
    </Settings>
  )
}
