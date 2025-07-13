import type { InferOutput } from 'valibot'
import type { BOARD_BG_IMAGES_IDS } from '../config/bg-images'
import type { BOARD_ICONS } from '../config/icon'
import type { BoardSchema, BoardsSchema } from './contracts'

export type BoardSchema = InferOutput<typeof BoardSchema>
export type BoardsSchema = InferOutput<typeof BoardsSchema>
export type BoardBgImageId = (typeof BOARD_BG_IMAGES_IDS)[number]
export type BoardIcon = (typeof BOARD_ICONS)[number]
