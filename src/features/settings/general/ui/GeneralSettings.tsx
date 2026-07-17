import { Settings } from '@/entities/setting'

import { THEMES } from '@/shared/config'
import { Switch } from '@/shared/ui'

import { useGeneralSettings } from '../api/useGeneralSettings'
import { useUpdateGeneralSettings } from '../api/useUpdateGeneralSettings'
import { AccentColorSelect } from './AccentColorSelect'
import { SelectControl } from './SelectControl'

export const GeneralSettings = () => {
  const { data, isPending } = useGeneralSettings()

  const { mutate: update } = useUpdateGeneralSettings()

  return (
    <Settings
      title='General'
      isLoading={isPending}>
      <Settings.Item>
        <Settings.Content>
          <Settings.Title>Theme</Settings.Title>
          <Settings.Description>
            Choose between light, dark, or system appearance.
          </Settings.Description>
        </Settings.Content>
        <Settings.Control>
          <SelectControl
            value={data?.theme}
            onChange={v => update({ body: { theme: v! } })}
            options={THEMES}
          />
        </Settings.Control>
      </Settings.Item>
      <Settings.Item>
        <Settings.Content>
          <Settings.Title>Accent color</Settings.Title>
          <Settings.Description>
            Set the primary color used throughout the app.
          </Settings.Description>
        </Settings.Content>
        <Settings.Control>
          <AccentColorSelect
            value={data?.accentColor}
            onChange={v => update({ body: { accentColor: v! } })}
          />
        </Settings.Control>
      </Settings.Item>
      <Settings.Item>
        <Settings.Content>
          <Settings.Title>First day of the week</Settings.Title>
          <Settings.Description>
            Choose which day your calendars and date pickers start on.
          </Settings.Description>
        </Settings.Content>
        <Settings.Control>
          <SelectControl
            value={data?.firstDayOfWeek}
            onChange={v => update({ body: { firstDayOfWeek: v! } })}
            options={['monday', 'sunday']}
          />
        </Settings.Control>
      </Settings.Item>
      <Settings.Item>
        <Settings.Content>
          <Settings.Title>Pointer cursors</Settings.Title>
          <Settings.Description>
            Show pointer cursors when hovering interactive elements.
          </Settings.Description>
        </Settings.Content>
        <Settings.Control>
          <Switch
            checked={data?.usePointerCursors}
            onCheckedChange={v => update({ body: { usePointerCursors: v } })}
          />
        </Settings.Control>
      </Settings.Item>
      <Settings.Item>
        <Settings.Content>
          <Settings.Title>Enable animations</Settings.Title>
          <Settings.Description>
            Enable animations and transitions throughout the app.
          </Settings.Description>
        </Settings.Content>
        <Settings.Control>
          <Switch
            checked={data?.enableAnimations}
            onCheckedChange={v => update({ body: { enableAnimations: v } })}
          />
        </Settings.Control>
      </Settings.Item>
    </Settings>
  )
}
