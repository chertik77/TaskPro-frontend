import { create } from 'zustand'
import { combine, persist } from 'zustand/middleware'

type ReactStyleStateSetter<T> = T | ((prev: T) => T)

export const useSidebarStore = create(
  persist(
    combine({ isOpen: true, isOpenOnMobile: false }, set => ({
      setIsOpen: (newStateOrSetterFn: ReactStyleStateSetter<boolean>) => {
        set(({ isOpen }) => {
          if (typeof newStateOrSetterFn === 'boolean') {
            return { isOpen: newStateOrSetterFn }
          }

          return { isOpen: newStateOrSetterFn(isOpen) }
        })
      },
      setIsOpenOnMobile: (
        newStateOrSetterFn: ReactStyleStateSetter<boolean>
      ) => {
        set(({ isOpenOnMobile }) => {
          if (typeof newStateOrSetterFn === 'boolean') {
            return { isOpenOnMobile: newStateOrSetterFn }
          }

          return { isOpenOnMobile: newStateOrSetterFn(isOpenOnMobile) }
        })
      }
    })),
    { name: 'isSidebarOpen' }
  )
)
