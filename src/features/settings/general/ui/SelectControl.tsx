import { capitalize } from '@/shared/lib'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue
} from '@/shared/ui'

type ThemeSelectProps<T> = {
  value: T | undefined
  onChange: (v: T | null) => void
  options: readonly T[]
}

export const SelectControl = <T extends string>({
  value,
  onChange,
  options
}: ThemeSelectProps<T>) => (
  <Select
    value={value}
    onValueChange={onChange}>
    <SelectTrigger>
      <SelectValue>{value => capitalize(value)}</SelectValue>
    </SelectTrigger>
    <SelectContent>
      {options.map(item => (
        <SelectItem
          key={item}
          disabled={item === value}
          value={item}>
          <SelectItemText>{capitalize(item)}</SelectItemText>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
)
