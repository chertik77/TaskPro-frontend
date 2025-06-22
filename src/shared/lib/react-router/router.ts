import { createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPendingMinMs: 0,
  context: { session: undefined! }
})
