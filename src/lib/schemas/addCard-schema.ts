import {
  minLength,
  object,
  picklist,
  string,
  toTrimmed,
  type Output,
  minValue
} from 'valibot'

const priorityList = ['Low', 'Medium', 'High', 'Without priority']
const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();






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
  deadline: string([minValue(`${yyyy}-${mm.toString().padStart(2, '0')}-${dd}`)])
})
export type AddCardSchemaFields = Output<typeof AddCardSchema>
