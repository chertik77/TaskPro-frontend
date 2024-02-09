import {
  minLength,
  object,
  string,
  toTrimmed,
  any,
  picklist,
  type Output
} from 'valibot'

const priorityList = ['Low', 'Medium', 'High', 'Without priority']

export const AddCardSchema = object({
  title: string([
    toTrimmed(),
    minLength(2, 'Please enter at least 2 characters.')
  ]),
  description: string([
    toTrimmed(),
    minLength(2, 'Please enter at least 2 characters.')
  ]),
  priority: picklist(priorityList),
  deadline: any()
})

export type AddCardSchemaFields = Output<typeof AddCardSchema>
