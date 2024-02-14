import { minLength, object, string, toTrimmed, type Output } from 'valibot'

export const columnSchema = object({
  title: string([
    toTrimmed(),
    minLength(3, 'Please enter at least 3 characters.')
  ])
})

export type ColumnSchemaFields = Output<typeof columnSchema>
