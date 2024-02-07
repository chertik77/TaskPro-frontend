import {
  date,
  minLength,
  object,
  string,
  toTrimmed,
  picklist,
  optional,
  type Output
} from 'valibot'

const priorityList = ['Low', 'Medium', 'High', 'Without priority']

export const AddCardSchema = object({
  title: string([
    toTrimmed(),
    minLength(2, 'Please enter at least 2 characters.')
  ]),
  description: optional(string([toTrimmed()])),
  priority: picklist(priorityList)
})

export type AddCardSchemaFields = Output<typeof AddCardSchema>
