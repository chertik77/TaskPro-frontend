import { create } from 'zustand'
import { combine, persist } from 'zustand/middleware'

type StateUpdater<T> = T | ((prev: T) => T)

export const useSidebarStore = create(
  persist(
    combine({ isOpen: true, isOpenMobile: false }, set => ({
      setIsOpen: (stateOrUpdater: StateUpdater<boolean>) => {
        set(({ isOpen }) => ({
          isOpen:
            typeof stateOrUpdater === 'boolean'
              ? stateOrUpdater
              : stateOrUpdater(isOpen)
        }))
      },
      setIsOpenMobile: (stateOrUpdater: StateUpdater<boolean>) => {
        set(({ isOpenMobile }) => ({
          isOpenMobile:
            typeof stateOrUpdater === 'boolean'
              ? stateOrUpdater
              : stateOrUpdater(isOpenMobile)
        }))
      }
    })),
    { name: 'sidebarState' }
  )
)
