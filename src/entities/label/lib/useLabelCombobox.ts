import type { Label } from '@/shared/api'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { labelQueries } from '../api/queries'
import { useLabelModalStore } from '../model/modal.store'

const CREATE_SENTINEL = '__create'

const isCreateOption = (id: string) => id === CREATE_SENTINEL

const buildCreateOption = (
  name: string
): Pick<Label, 'id' | 'name' | 'color'> => ({
  id: CREATE_SENTINEL,
  name: `Create "${name}"`,
  color: 'gray'
})

export const useLabelCombobox = (labelsValues: string[] | undefined) => {
  const [inputValue, setInputValue] = useState('')

  const { setModal } = useLabelModalStore()

  const { data: labels = [], isPending, error } = useQuery(labelQueries.list())

  const labelMap = useMemo(() => new Map(labels.map(l => [l.id, l])), [labels])

  const filteredItems = useMemo(() => {
    const filtered = labels.filter(l =>
      l.name.toLowerCase().startsWith(inputValue.toLowerCase())
    )

    const canCreate =
      inputValue.trim().length > 1 && !labels.some(l => l.name === inputValue)

    return canCreate ? [...filtered, buildCreateOption(inputValue)] : filtered
  }, [labels, inputValue])

  const handleValueChange = (
    values: string[],
    onChange: (v: string[]) => void
  ) => {
    if (values.some(isCreateOption)) {
      return setModal({
        isOpen: true,
        props: {
          name: inputValue,
          onCreated: (newLabel: Label) => {
            const current = labelsValues ?? []
            onChange([...current, newLabel.id])
          }
        }
      })
    }

    onChange(values)
  }

  return {
    labels,
    isLoading: isPending,
    error,
    labelMap,
    filteredItems,
    inputValue,
    setInputValue,
    handleValueChange
  }
}
