import * as v from 'valibot'

import { BOARD_BG_IMAGES_IDS, BOARD_ICONS } from '@/entities/board'

export const AddBoardSchema = v.object({
  title: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(3, 'Please enter at least 3 characters.')
  ),
  icon: v.fallback(v.picklist(BOARD_ICONS), 'project'),
  background: v.fallback(v.picklist(BOARD_BG_IMAGES_IDS), 'default')
})

export type AddBoardSchema = v.InferOutput<typeof AddBoardSchema>
