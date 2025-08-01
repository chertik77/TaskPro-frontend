import { createRouter } from '@tanstack/react-router'

import { queryClient } from '../query/query-client'
import { routeTree } from './routeTree.gen'

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPendingMinMs: 0,
  context: { queryClient }
})
