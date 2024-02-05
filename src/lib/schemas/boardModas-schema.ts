import { minLength, object, string, toTrimmed, type Output } from 'valibot'

export const boardSchema = object({
  title: string([
    toTrimmed(),
    minLength(5, 'Please enter at least 5 characters.')
  ])
})

export type BoardModal = Output<typeof boardSchema>
