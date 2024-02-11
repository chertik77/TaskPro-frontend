import { minLength, object, string, toTrimmed, Output } from 'valibot'

export const boardSchema = object({
  title: string([
    toTrimmed(),
    minLength(4, 'Please enter at least 4 characters.')
  ])
})

export type BoardModal = Output<typeof boardSchema>
