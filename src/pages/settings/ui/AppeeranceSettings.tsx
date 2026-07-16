import { ChevronDownIcon } from 'lucide-react'

import { THEMES } from '@/shared/config'
import { capitalize } from '@/shared/lib'
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
  Switch
} from '@/shared/ui'

import { Settings } from './Settings'

export const AppearanceSettings = () => (
  <Settings title='Appearance'>
    <Settings.Item>
      <Settings.Content>
        <Settings.Title>Display full names</Settings.Title>

        <Settings.Description>
          Which view is opened when you open up
        </Settings.Description>
      </Settings.Content>

      <Settings.Control>
        <Switch />
      </Settings.Control>
    </Settings.Item>
    <Settings.Item>
      <Settings.Content>
        <Settings.Title>Display full names</Settings.Title>

        <Settings.Description>
          Which view is opened when you open up
        </Settings.Description>
      </Settings.Content>

      <Settings.Control>
        <Select>
          <SelectTrigger
            className='border-brand flex items-center gap-2 rounded-lg border
              px-4 py-2.5'>
            <SelectValue placeholder='Theme'>wedewdewdwe</SelectValue>
            <SelectIcon render={<ChevronDownIcon className='size-4' />} />
          </SelectTrigger>
          <SelectContent className='flex min-w-(--anchor-width) flex-col gap-1'>
            {THEMES.map(theme => (
              <SelectItem
                key={theme}
                // disabled={theme === currentTheme}
                className='data-disabled:cursor-not-allowed
                  data-highlighted:underline'
                value={theme}>
                <SelectItemText>{capitalize(theme)}</SelectItemText>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Settings.Control>
    </Settings.Item>
  </Settings>
)
