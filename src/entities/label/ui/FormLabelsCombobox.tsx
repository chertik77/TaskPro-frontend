import type { LabelSchema } from '../model/types'

import { cn } from '@/shared/lib'
import {
  createTypeSafeCombobox,
  Loader,
  useComboboxAnchorRef,
  useFormField
} from '@/shared/ui'

import { COLOR_MAP } from '../config/color-map'
import { useLabelCombobox } from '../lib/useLabelCombobox'
import { LabelChip } from './LabelChip'

const Combobox = createTypeSafeCombobox<LabelSchema, string>()

type FormLabelsComboboxProps = {
  labelsValues: string[] | undefined
}

export const FormLabelsCombobox = ({
  labelsValues
}: FormLabelsComboboxProps) => {
  const anchor = useComboboxAnchorRef()

  const {
    field: { ref, value, onBlur, onChange }
  } = useFormField()

  const {
    labels,
    filteredItems,
    isLoading,
    error,
    inputValue,
    setInputValue,
    handleValueChange,
    labelMap
  } = useLabelCombobox(labelsValues)

  return (
    <Combobox.Root
      multiple
      items={labels}
      value={value}
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
              <LabelChip
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
        className='data-closed:duration-0'
        positionerProps={{
          anchor,
          side: 'bottom',
          collisionAvoidance: { side: 'shift' }
        }}>
        <Combobox.Empty className='p-2'>
          <button className='text-md flex items-center gap-1 p-3'>
            No labels found.
            {isLoading && (
              <>
                <Loader className='size-3 border' />
                Loading your labels...
              </>
            )}
            {error && 'Something went wrong. Please try again later.'}
          </button>
        </Combobox.Empty>
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
