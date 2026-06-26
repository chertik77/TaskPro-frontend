import type { ControllerRenderProps, FieldValues } from 'react-hook-form'

import { useQuery } from '@tanstack/react-query'

import { axiosInstance } from '@/shared/api'
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
  FormControl,
  useComboboxAnchorRef
} from '@/shared/ui'

//  const colorMap = {
//             blue: 'bg-blue-500',
//             violet: 'bg-violet-500',
//             emerald: 'bg-emerald-500',
//             rose: 'bg-rose-500',
//             amber: 'bg-amber-500',
//             cyan: 'bg-cyan-500',
//             orange: 'bg-orange-500',
//             indigo: 'bg-indigo-500',
//             gray: 'bg-gray-500'
//           } as const

export const FormLabelsCombobox = <T extends FieldValues>({
  value,
  onChange
}: ControllerRenderProps<T>) => {
  const anchor = useComboboxAnchorRef()

  const labels = useQuery({
    queryKey: ['labels'],
    queryFn: () => axiosInstance.get('/label').then(res => res.data)
  })

  return (
    <Combobox
      multiple
      value={value}
      items={labels.data}
      onValueChange={onChange}
      onInputValueChange={console.log}
      autoHighlight>
      <ComboboxChips
        ref={anchor}
        className='w-full max-w-xs'>
        <ComboboxValue>
          {values => (
            <>
              {values.map((v: string) => (
                <ComboboxChip key={v}>ok</ComboboxChip>
              ))}
              <FormControl
                render={<ComboboxChipsInput />}
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
              key={item.id}
              value={item.id}>
              <span
                className={cn('size-2 rounded-full', `bg-${item.color}-500`)}
              />
              {item.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
