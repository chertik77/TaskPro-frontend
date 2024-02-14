import { object, picklist, type Output } from 'valibot'

const priorityList = ['Low', 'Medium', 'High', 'Without priority']

export const filterSchema = object({
  priority: picklist(priorityList)
})

export type FilterSchemaFields = Output<typeof filterSchema>
