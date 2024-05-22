import type { Output } from 'valibot'

import { minLength, object, picklist, string, toTrimmed } from 'valibot'

import iconsData from 'lib/json/board-icons.json'

export const BoardSchema = object({
  title: string([
    toTrimmed(),
    minLength(3, 'Please enter at least 3 characters.')
  ]),
  icon: picklist(iconsData.map(icon => icon.id)),
  background: string()
})

export type BoardSchema = Output<typeof BoardSchema>
