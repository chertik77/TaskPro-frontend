import type { router } from '@/shared/lib/react-router'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
