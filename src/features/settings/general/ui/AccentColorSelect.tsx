import { ACCENT_COLOR_MAP } from '@/entities/user/@x/setting'

import { AccentColor } from '@/shared/api'
import { capitalize } from '@/shared/lib'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue
} from '@/shared/ui'

type AccentColorSelectProps = {
  value: AccentColor | undefined
  onChange: (v: AccentColor | null) => void
}

export const AccentColorSelect = ({
  value,
  onChange
}: AccentColorSelectProps) => (
  <Select
    value={value}
    onValueChange={onChange}>
    <SelectTrigger>
      <SelectValue>
        {(v: AccentColor) => (
          <div className='flex items-center gap-2'>
            <span
              className='block size-3 rounded-full'
              style={{ backgroundColor: ACCENT_COLOR_MAP[v] }}
            />
            {v ? capitalize(v) : ''}
          </div>
        )}
      </SelectValue>
    </SelectTrigger>
    <SelectContent>
      {Object.values(AccentColor).map(color => (
        <SelectItem
          key={color}
          disabled={color === value}
          className='flex items-center gap-2'
          value={color}>
          <span
            className='size-3 shrink-0 rounded-full'
            style={{ backgroundColor: ACCENT_COLOR_MAP[color] }}
          />
          <SelectItemText>{capitalize(color)}</SelectItemText>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
)
