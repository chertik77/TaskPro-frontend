import type { ControllerRenderProps, FieldValues } from 'react-hook-form'

import { cn } from '@/shared/lib'
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchorRef
} from '@/shared/ui'

const labelColors = [
  {
    label: 'frontend',
    value: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300'
  },
  {
    label: 'backend',
    value:
      'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300'
  },
  {
    label: 'research',
    value:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
  },
  {
    label: 'bug',
    value: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300'
  },
  {
    label: 'design',
    value:
      'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300'
  },
  {
    label: 'cyan',
    value: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300'
  },
  {
    label: 'orange',
    value:
      'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300'
  },
  {
    label: 'indigo',
    value:
      'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300'
  },
  {
    label: 'design',
    value:
      'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300'
  },
  {
    label: 'cyan',
    value: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300'
  },
  {
    label: 'orange',
    value:
      'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300'
  },
  {
    label: 'indigo',
    value:
      'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300'
  }
] as const

export const FormLabelsCombobox = <T extends FieldValues>({
  value
  // onChange
}: ControllerRenderProps<T>) => {
  const anchor = useComboboxAnchorRef()

  return (
    <Combobox
      multiple
      autoHighlight
      items={labelColors}>
      <ComboboxChips
        ref={anchor}
        className='w-full max-w-xs'>
        <ComboboxValue>
          {values => (
            <>
              {values.map((value: string) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput
                className={cn(values.length > 0 && 'px-0')}
                placeholder={values.length > 0 ? '' : 'Add labels'}
              />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent
        anchor={anchor}
        side='bottom'>
        <ComboboxEmpty>
          <button
            // onClick={createLabel}
            className='hover:bg-muted flex w-full items-center gap-2 p-2
              text-sm'>
            {/* <Plus size={14} /> */}
            Create {value}
          </button>
        </ComboboxEmpty>
        <ComboboxList>
          {item => (
            <ComboboxItem
              key={item}
              value={item.label.charAt(0).toUpperCase() + item.label.slice(1)}>
              <span className={cn('size-2 rounded-full', item.value)} />
              {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
