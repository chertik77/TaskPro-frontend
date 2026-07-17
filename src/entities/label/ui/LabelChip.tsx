import type { Label } from '@/shared/api'

import { createTypeSafeCombobox } from '@/shared/ui'

import { LABEL_COLOR_MAP } from '../config/color-map'

const Combobox = createTypeSafeCombobox<Label, string>()

type LabelChipProps = {
  labelMap: Map<string, Label>
  values: string[]
}

export const LabelChip = ({ labelMap, values }: LabelChipProps) => (
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
