import { queryOptions } from '@tanstack/react-query'

import { labelService } from './service'

export const labelQueries = {
  all: () => ['labels'],
  lists: () => [...labelQueries.all(), 'list'],
  list: () =>
    queryOptions({
      queryKey: labelQueries.lists(),
      queryFn: labelService.getAllLabels
    })
}
