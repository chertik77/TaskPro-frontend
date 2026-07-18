import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue
} from '@/shared/ui'

type SelectOption<T extends string> = {
  value: T
  label: string
}

type SelectControlProps<T extends string> = {
  value: T | undefined
  onChange: (value: T | null) => void
  options: readonly SelectOption<T>[]
}

export const SelectControl = <T extends string>({
  value,
  onChange,
  options
}: SelectControlProps<T>) => (
  <Select
    value={value}
    items={options}
    onValueChange={onChange}>
    <SelectTrigger>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {options.map(option => (
        <SelectItem
          key={option.value}
          value={option.value}>
          <SelectItemText>{option.label}</SelectItemText>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
)
