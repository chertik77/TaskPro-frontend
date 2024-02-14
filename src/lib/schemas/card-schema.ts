import {
  minLength,
  minValue,
  object,
  picklist,
  string,
  toTrimmed,
  type Output
} from 'valibot'

const priorityList = ['Low', 'Medium', 'High', 'Without priority']
const today = new Date()
const yyyy = today.getFullYear()
const mm = today.getMonth() + 1
const dd = today.getDate()

export const cardSchema = object({
  title: string([
    toTrimmed(),
    minLength(3, 'Please enter at least 3 characters.')
  ]),
  description: string([
    toTrimmed(),
    minLength(3, 'Please enter at least 3 characters.')
  ]),
  priority: picklist(priorityList),
  deadline: string([
    minValue(`${yyyy}-${mm.toString().padStart(2, '0')}-${dd}`)
  ])
})

export type CardSchemaFields = Output<typeof cardSchema>
