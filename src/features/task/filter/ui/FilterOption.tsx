import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib'
import { Checkbox } from '@/shared/ui'

type FilterOptionProps = {
  isChecked: boolean
  onCheckedChange: () => void
} & Omit<ComponentProps<'label'>, 'onChange'>

export const FilterOption = ({
  isChecked,
  onCheckedChange,
  className,
  children,
  ...props
}: FilterOptionProps) => (
  <label
    className={cn(
      `text-md hocus:text-black dark:hocus:text-white flex cursor-pointer
      items-center gap-2 text-black/50 has-data-checked:text-black
      dark:text-white/50 dark:has-data-checked:text-white`,
      className
    )}
    {...props}>
    <Checkbox
      checked={isChecked}
      onCheckedChange={onCheckedChange}
    />
    {children}
  </label>
)
