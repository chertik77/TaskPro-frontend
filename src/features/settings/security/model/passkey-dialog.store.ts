import { createStore } from 'stan-js'

export const { useStore: usePasskeyDialogStore } = createStore({
  isOpen: false
})
