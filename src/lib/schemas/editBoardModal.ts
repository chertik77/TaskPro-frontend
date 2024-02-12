import iconsData from 'lib/json/board-icons.json'
import { Output, minLength, object, picklist, string } from 'valibot'

const listIcons = iconsData.map(icon => icon.id)

export const editBoardSchema = object({
  title: string([minLength(4, 'Please enter at least 4 characters.')]),
  icon: picklist(listIcons),
  background: string()
})

export type EditBoard = Output<typeof editBoardSchema>
