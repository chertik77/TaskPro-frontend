import * as v from 'valibot'

import iconsData from 'lib/json/board-icons.json'

import { TitleSchema } from './base.schema'

export const BoardSchema = v.object({
  ...TitleSchema.entries,
  icon: v.picklist(iconsData.map(icon => icon.id)),
  background: v.string()
})

export type BoardSchema = v.Output<typeof BoardSchema>
