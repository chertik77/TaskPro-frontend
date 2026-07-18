import { Settings, useSettings } from '@/entities/setting'

import { Switch } from '@/shared/ui'

import { useUpdateGeneralSettings } from '../api/useUpdateGeneralSettings'
import { BOARD_BACKGROUND_BLUR_OPTIONS } from '../config/board-background-blur-options'
import { DATE_FORMAT_OPTIONS } from '../config/date-format-options'
import { FIRST_DAY_WEEK_OPTIONS } from '../config/first-day-week-options'
import { THEME_OPTIONS } from '../config/theme-options'
import { AccentColorSelect } from './AccentColorSelect'
import { SelectControl } from './SelectControl'

export const GeneralSettings = () => {
  const { data: generalSettings, isPending } = useSettings(
    select => select.general
  )

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
            value={generalSettings?.theme}
            onChange={v => update({ body: { theme: v! } })}
            options={THEME_OPTIONS}
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
            value={generalSettings?.accentColor}
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
            value={generalSettings?.firstDayOfWeek}
            onChange={v => update({ body: { firstDayOfWeek: v! } })}
            options={FIRST_DAY_WEEK_OPTIONS}
          />
        </Settings.Control>
      </Settings.Item>
      <Settings.Item>
        <Settings.Content>
          <Settings.Title>Date format</Settings.Title>
          <Settings.Description>
            Select how dates are displayed across the app.
          </Settings.Description>
        </Settings.Content>
        <Settings.Control>
          <SelectControl
            value={generalSettings?.dateFormat}
            onChange={v => update({ body: { dateFormat: v! } })}
            options={DATE_FORMAT_OPTIONS}
          />
        </Settings.Control>
      </Settings.Item>
      <Settings.Item>
        <Settings.Content>
          <Settings.Title>Board background blur</Settings.Title>
          <Settings.Description>
            Adjust the blur applied to board backgrounds.
          </Settings.Description>
        </Settings.Content>
        <Settings.Control>
          <SelectControl
            value={generalSettings?.boardBackgroundBlur}
            onChange={v => update({ body: { boardBackgroundBlur: v! } })}
            options={BOARD_BACKGROUND_BLUR_OPTIONS}
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
            checked={generalSettings?.usePointerCursors}
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
            checked={generalSettings?.enableAnimations}
            onCheckedChange={v => update({ body: { enableAnimations: v } })}
          />
        </Settings.Control>
      </Settings.Item>
      <Settings.Item>
        <Settings.Content>
          <Settings.Title>Confirm before delete</Settings.Title>
          <Settings.Description>
            Ask for confirmation before permanently deleting items.
          </Settings.Description>
        </Settings.Content>
        <Settings.Control>
          <Switch
            checked={generalSettings?.confirmBeforeDelete}
            onCheckedChange={v => update({ body: { confirmBeforeDelete: v } })}
          />
        </Settings.Control>
      </Settings.Item>
    </Settings>
  )
}
