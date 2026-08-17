import { createStore } from 'stan-js'
import { storage } from 'stan-js/storage'

export const { useStore: useSidebarStore } = createStore({
  isOpen: storage(true, { storageKey: 'sidebar-state' }),
  isOpenMobile: false
})
