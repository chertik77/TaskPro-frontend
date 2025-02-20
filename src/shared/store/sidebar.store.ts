import { create } from 'zustand'
import { combine, persist } from 'zustand/middleware'

type StateUpdater<T> = T | ((prev: T) => T)

export const useSidebarStore = create(
  persist(
    combine({ isSidebarOpen: true, isMobileSidebarOpen: false }, set => ({
      toggleSidebar: (stateOrUpdater: StateUpdater<boolean>) => {
        set(({ isSidebarOpen }) => ({
          isSidebarOpen:
            typeof stateOrUpdater === 'boolean'
              ? stateOrUpdater
              : stateOrUpdater(isSidebarOpen)
        }))
      },
      toggleMobileSidebar: (stateOrUpdater: StateUpdater<boolean>) => {
        set(({ isMobileSidebarOpen }) => ({
          isMobileSidebarOpen:
            typeof stateOrUpdater === 'boolean'
              ? stateOrUpdater
              : stateOrUpdater(isMobileSidebarOpen)
        }))
      }
    })),
    { name: 'sidebarState' }
  )
)
