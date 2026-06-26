import * as v from 'valibot'

import { LABEL_COLORS } from '../config/colors'

export const LabelSchema = v.object({
  id: v.string(),
  name: v.string(),
  color: v.picklist(LABEL_COLORS)
})

export const LabelsSchema = v.array(LabelSchema)
