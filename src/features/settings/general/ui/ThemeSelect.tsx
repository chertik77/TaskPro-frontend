import type { Theme } from '@/shared/config'

import { THEMES } from '@/shared/config'
import { capitalize } from '@/shared/lib'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue
} from '@/shared/ui'

type ThemeSelectProps = {
  value: Theme | undefined
  onChange: (v: Theme | null) => void
}

export const ThemeSelect = ({ value, onChange }: ThemeSelectProps) => (
  <Select
    value={value}
    onValueChange={onChange}>
    <SelectTrigger>
      <SelectValue>{value => capitalize(value)}</SelectValue>
    </SelectTrigger>
    <SelectContent>
      {THEMES.map(t => (
        <SelectItem
          key={t}
          disabled={t === value}
          className='data-disabled:cursor-not-allowed
            data-highlighted:underline'
          value={t}>
          <SelectItemText>{capitalize(t)}</SelectItemText>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
)
