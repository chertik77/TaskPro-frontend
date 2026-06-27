import type { LabelSchema } from '../model/types'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { labelQueries } from '../api/queries'
import { useLabelModalStore } from '../model/modal.store'

const CREATE_SENTINEL = '__create'

const isCreateOption = (id: string) => id === CREATE_SENTINEL

const buildCreateOption = (name: string): LabelSchema => ({
  id: CREATE_SENTINEL,
  name: `Create "${name}"`,
  color: 'gray'
})

export const useLabelCombobox = () => {
  const [inputValue, setInputValue] = useState('')

  const { setModal } = useLabelModalStore()

  const { data: labels = [] } = useQuery(labelQueries.list())

  const labelMap = useMemo(() => new Map(labels.map(l => [l.id, l])), [labels])

  const filteredItems = useMemo(() => {
    const filtered = labels.filter(l =>
      l.name.toLowerCase().startsWith(inputValue.toLowerCase())
    )

    const canCreate = inputValue && !labels.some(l => l.name === inputValue)

    return canCreate ? [...filtered, buildCreateOption(inputValue)] : filtered
  }, [labels, inputValue])

  const handleValueChange = (
    value: string[],
    onChange: (v: string[]) => void
  ) => {
    if (value.some(isCreateOption)) {
      return setModal({ isOpen: true, props: { name: inputValue } })
    }

    onChange(value)
  }

  return {
    labels,
    labelMap,
    filteredItems,
    inputValue,
    setInputValue,
    handleValueChange
  }
}
