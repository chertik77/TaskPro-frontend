import type { ControllerRenderProps, FieldValues } from 'react-hook-form'
import type { LabelSchema } from '../model/types'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { cn } from '@/shared/lib'
import { createTypeSafeCombobox, useComboboxAnchorRef } from '@/shared/ui'

import { labelQueries } from '../api/queries'
import { BADGE_COLOR_MAP } from '../config/badge-color-map'

const Combobox = createTypeSafeCombobox<LabelSchema, string>()

export const FormLabelsCombobox = <T extends FieldValues>({
  ref,
  onBlur,
  value,
  onChange
}: ControllerRenderProps<T>) => {
  const [inputValue, setInputValue] = useState('')

  const anchor = useComboboxAnchorRef()

  const labels = useQuery(labelQueries.list())

  const labelMap = useMemo(
    () => new Map(labels.data?.map(l => [l.id, l])),
    [labels.data]
  )

  return (
    <Combobox.Root
      multiple
      items={labels.data ?? []}
      value={value}
      filter={(item, input) =>
        item.name.toLowerCase().startsWith(input.toLowerCase())
      }
      onValueChange={onChange}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      autoHighlight>
      <Combobox.Chips
        ref={anchor}
        className='w-full max-w-xs'>
        <Combobox.Value>
          {values => {
            const selectedLabels = values
              .map(id => labelMap.get(id))
              .filter(Boolean)

            return (
              <>
                {selectedLabels?.map(v => (
                  <Combobox.Chip
                    key={v?.id}
                    className={BADGE_COLOR_MAP[v?.color ?? 'gray']}>
                    {v?.name ?? 'Unknown'}
                  </Combobox.Chip>
                ))}
                <Combobox.ChipsInput
                  ref={ref}
                  onBlur={onBlur}
                  className={cn(values.length > 0 && 'px-0')}
                  placeholder={values.length > 0 ? '' : 'Add labels'}
                />
              </>
            )
          }}
        </Combobox.Value>
      </Combobox.Chips>
      <Combobox.Content
        anchor={anchor}
        side='bottom'>
        <Combobox.Empty>
          <button
            // onClick={createLabel}
            className='hover:bg-muted flex w-full items-center gap-2 p-2
              text-sm'>
            {/* <Plus size={14} /> */}
            Create {value}
          </button>
        </Combobox.Empty>
        <Combobox.List>
          {item => (
            <Combobox.Item
              key={item.id}
              value={item.id}>
              <span
                className={cn('size-2 rounded-full', `bg-${item.color}-500`)}
              />
              {item.name}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Root>
  )
}
