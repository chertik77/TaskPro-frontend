import type { LabelSchema } from '../model/types'

import { createTypeSafeCombobox } from '@/shared/ui'

import { LABEL_COLOR_MAP } from '../config/color-map'

const Combobox = createTypeSafeCombobox<LabelSchema, string>()

type LabelChipsProps = {
  labelMap: Map<string, LabelSchema>
  values: string[]
}

export const LabelChips = ({ labelMap, values }: LabelChipsProps) => (
  <>
    {values
      .map(id => labelMap.get(id))
      .filter(Boolean)
      .map(label => (
        <Combobox.Chip
          key={label?.id}
          className={LABEL_COLOR_MAP[label?.color ?? 'gray']}>
          {label?.name ?? 'Unknown'}
        </Combobox.Chip>
      ))}
  </>
)
