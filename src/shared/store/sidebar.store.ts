import { create } from 'zustand'
import { combine, persist } from 'zustand/middleware'

type StateUpdater<T> = T | ((prev: T) => T)

export const useSidebarStore = create(
  persist(
    combine({ isSidebarOpen: true, isSidebarMobileMenuOpen: false }, set => ({
      toggleSidebar: (stateOrUpdater: StateUpdater<boolean>) => {
        set(({ isSidebarOpen }) => ({
          isSidebarOpen:
            typeof stateOrUpdater === 'boolean'
              ? stateOrUpdater
              : stateOrUpdater(isSidebarOpen)
        }))
      },
      toggleSidebarMobileMenu: (stateOrUpdater: StateUpdater<boolean>) => {
        set(({ isSidebarMobileMenuOpen }) => ({
          isSidebarMobileMenuOpen:
            typeof stateOrUpdater === 'boolean'
              ? stateOrUpdater
              : stateOrUpdater(isSidebarMobileMenuOpen)
        }))
      }
    })),
    { name: 'sidebarState' }
  )
)
