import * as v from 'valibot'

import iconsData from 'lib/json/board-icons.json'

export const TitleSchema = v.object({
  title: v.string([
    v.toTrimmed(),
    v.minLength(3, 'Please enter at least 3 characters.')
  ])
})

export const BoardSchema = v.object({
  ...TitleSchema.entries,
  icon: v.picklist(iconsData.map(icon => icon.id)),
  background: v.string()
})

export type BoardSchema = v.Output<typeof BoardSchema>
