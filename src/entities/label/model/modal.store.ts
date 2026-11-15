import type { Label } from '@/shared/api'

import { createStore } from 'stan-js'

export type LabelModalProps = {
  name?: string
  onCreated?: (label: Label) => void
}

type LabelModal = {
  isOpen: boolean
  props?: LabelModalProps
}

export const { useStore: useLabelModalStore } = createStore({
  modal: { isOpen: false } as LabelModal
})
