import { create } from 'zustand'
import { combine, persist } from 'zustand/middleware'

type ReactStyleStateSetter<T> = T | ((prev: T) => T)

export const useSidebarStore = create(
  persist(
    combine({ isSidebarOpen: true }, set => ({
      setIsSidebarOpen: (
        newStateOrSetterFn: ReactStyleStateSetter<boolean>
      ) => {
        set(({ isSidebarOpen }) => {
          if (typeof newStateOrSetterFn === 'boolean') {
            return { isSidebarOpen: newStateOrSetterFn }
          }

          return { isSidebarOpen: newStateOrSetterFn(isSidebarOpen) }
        })
      }
    })),
    { name: 'isSidebarOpen' }
  )
)
