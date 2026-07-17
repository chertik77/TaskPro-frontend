import { ChevronDownIcon } from 'lucide-react'

import { COLOR_MAP } from '@/entities/label'
import { Settings } from '@/entities/settings'

import { LabelColor } from '@/shared/api'
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
          <Select
            value={data?.theme}

            onValueChange={v => update({ body: { theme: v! } })}>
            <SelectTrigger
              className='border-accent flex items-center gap-2 rounded-lg border
                px-4 py-2.5'>
              <SelectValue>{value => capitalize(value)}</SelectValue>
              <SelectIcon render={<ChevronDownIcon className='size-4' />} />
            </SelectTrigger>
            <SelectContent
              className='flex min-w-[calc(var(--anchor-width)+2px)] flex-col
                gap-1'>
              {THEMES.map(t => (
                <SelectItem
                  key={t}
                  disabled={t === data?.theme}
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
          <Settings.Title>Accent color</Settings.Title>
          <Settings.Description>
            Set the primary color used throughout the app.
          </Settings.Description>
        </Settings.Content>
        <Settings.Control>
          <Select
            value={data?.accentColor}
            onValueChange={v => update({ body: { accentColor: v! } })}>
            <SelectTrigger
              className='border-accent flex items-center gap-2 rounded-lg border
                px-4 py-2.5'>
              <SelectValue className='flex items-center gap-2'>
                {(v: LabelColor) => (
                  <>
                    <span
                      className='block size-3 rounded-full'
                      style={{ backgroundColor: COLOR_MAP[v].value }}
                    />
                    {capitalize(v)}
                  </>
                )}
              </SelectValue>
              <SelectIcon render={<ChevronDownIcon className='size-4' />} />
            </SelectTrigger>
            <SelectContent
              className='flex min-w-[calc(var(--anchor-width)+2px)] flex-col
                gap-2'>
              {Object.values(LabelColor).map(t => (
                <SelectItem
                  key={t}
                  className='flex items-center gap-2
                    data-disabled:cursor-not-allowed data-highlighted:underline'
                  value={t}>
                  <span
                    className='block size-3 rounded-full'
                    style={{ backgroundColor: COLOR_MAP[t].value }}
                  />
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
