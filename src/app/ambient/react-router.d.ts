import type { router } from '@/shared/lib'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
