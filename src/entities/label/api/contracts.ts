import * as v from 'valibot'

import { LABEL_COLORS } from '../config/colors'

export const LabelDtoSchema = v.object({
  id: v.string(),
  name: v.string(),
  color: v.picklist(LABEL_COLORS)
})

export const LabelsDtoSchema = v.array(LabelDtoSchema)

export const AddLabelDtoSchema = v.pick(LabelDtoSchema, ['name', 'color'])
