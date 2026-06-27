import { createStore } from 'stan-js'

type LabelModal = {
  isOpen: boolean
  props?: Record<string, unknown>
}

export const { useStore: useLabelModalStore } = createStore({
  modal: { isOpen: false } as LabelModal
})
