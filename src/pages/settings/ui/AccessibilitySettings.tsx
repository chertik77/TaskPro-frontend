import { SettingsWrapper } from '@/widgets/settings-wrapper'

import { ACCESSIBILITY_SETTINGS } from '../config/accessibility-settings'

export const AccessibilitySettings = () => (
  <SettingsWrapper title='Accessibility'>
    {ACCESSIBILITY_SETTINGS.map(({ title, description, control: Control }) => (
      <SettingsWrapper.Item key={title}>
        <SettingsWrapper.Content>
          <SettingsWrapper.Title>{title}</SettingsWrapper.Title>
          <SettingsWrapper.Description>
            {description}
          </SettingsWrapper.Description>
        </SettingsWrapper.Content>
        <SettingsWrapper.Control>
          <Control />
        </SettingsWrapper.Control>
      </SettingsWrapper.Item>
    ))}
  </SettingsWrapper>
)
