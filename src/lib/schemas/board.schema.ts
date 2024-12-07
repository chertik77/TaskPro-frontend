import * as v from 'valibot'

import { icons } from 'constants/icons'

export const TitleSchema = v.object({
  title: v.string([
    v.toTrimmed(),
    v.minLength(3, 'Please enter at least 3 characters.')
  ])
})

export const BoardSchema = v.object({
  ...TitleSchema.entries,
  icon: v.picklist(icons),
  background: v.string()
})

export type BoardSchema = v.Output<typeof BoardSchema>
