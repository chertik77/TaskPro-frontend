import { ChevronDownIcon } from 'lucide-react'

import { Settings } from '@/entities/settings'

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

import { useGeneralSettings } from '../api/useGeneralSettings'
import { useUpdateGeneralSettings } from '../api/useUpdateGeneralSettings'
import { useThemeWithRootSync } from '../lib/useThemeWithRootSync'

export const GeneralSettings = () => {
  const { data, isPending } = useGeneralSettings()

  const { mutate: update } = useUpdateGeneralSettings()

  const { theme: currentTheme } = useThemeWithRootSync()

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
          <Select
            value={currentTheme}
            onValueChange={v => update({ body: { theme: v! } })}>
            <SelectTrigger
              className='border-brand flex items-center gap-2 rounded-lg border
                px-4 py-2.5'>
              <SelectValue />
              <SelectIcon render={<ChevronDownIcon className='size-4' />} />
            </SelectTrigger>
            <SelectContent
              className='flex min-w-[calc(var(--anchor-width)+2px)] flex-col
                gap-1'>
              {THEMES.map(t => (
                <SelectItem
                  key={t}
                  className='data-disabled:cursor-not-allowed
                    data-highlighted:underline'
                  value={t}>
                  <SelectItemText>{capitalize(t)}</SelectItemText>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
    </Settings>
  )
}
