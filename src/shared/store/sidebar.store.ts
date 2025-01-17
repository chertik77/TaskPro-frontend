import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  isSidebarOpen: boolean
}

const initialState: State = {
  isSidebarOpen: true
}

type ReactStyleStateSetter<T> = T | ((prev: T) => T)

type Action = {
  setIsSidebarOpen: (newStateOrSetterFn: ReactStyleStateSetter<boolean>) => void
}

export const useSidebarStore = create(
  persist<State & Action>(
    set => ({
      ...initialState,
      setIsSidebarOpen: newStateOrSetterFn => {
        set(({ isSidebarOpen }) => {
          if (typeof newStateOrSetterFn === 'boolean') {
            return { isSidebarOpen: newStateOrSetterFn }
          }

          return { isSidebarOpen: newStateOrSetterFn(isSidebarOpen) }
        })
      }
    }),
    { name: 'isSidebarOpen' }
  )
)
