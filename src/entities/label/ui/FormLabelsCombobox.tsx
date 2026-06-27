import type { ControllerRenderProps, FieldValues } from 'react-hook-form'
import type { LabelSchema } from '../model/types'

import { cn } from '@/shared/lib'
import { createTypeSafeCombobox, useComboboxAnchorRef } from '@/shared/ui'

import { COLOR_MAP } from '../config/color-map'
import { useLabelCombobox } from '../lib/useLabelCombobox'
import { LabelChips } from './LabelChips'

const Combobox = createTypeSafeCombobox<LabelSchema, string>()

export const FormLabelsCombobox = <T extends FieldValues>({
  ref,
  onBlur,
  value,
  onChange
}: ControllerRenderProps<T>) => {
  const anchor = useComboboxAnchorRef()

  const {
    labels,
    filteredItems,
    inputValue,
    setInputValue,
    handleValueChange,
    labelMap
  } = useLabelCombobox()

  return (
    <Combobox.Root
      multiple
      items={labels}
      value={value}
      filter={(item, input) =>
        item.name.toLowerCase().startsWith(input.toLowerCase())
      }
      filteredItems={filteredItems}
      onValueChange={v => handleValueChange(v, onChange)}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      autoHighlight>
      <Combobox.Chips
        ref={anchor}
        className='w-full max-w-xs'>
        <Combobox.Value>
          {values => (
            <>
              <LabelChips
                labelMap={labelMap}
                values={values}
              />
              <Combobox.ChipsInput
                ref={ref}
                onBlur={onBlur}
                className={cn(values.length > 0 && 'px-0')}
                placeholder={values.length > 0 ? '' : 'Add labels'}
              />
            </>
          )}
        </Combobox.Value>
      </Combobox.Chips>
      <Combobox.Content
        anchor={anchor}
        side='bottom'>
        <Combobox.List>
          {item => (
            <Combobox.Item
              key={item.id}
              value={item.id}>
              <span
                className={cn('size-2 rounded-full', COLOR_MAP[item.color])}
              />
              {item.name}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Root>
  )
}
