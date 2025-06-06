import type { FieldValues, UseFormWatch } from 'react-hook-form'

import { useMemo } from 'react'

export const useIsFormReadyForSubmit = <T extends FieldValues>(
  initialValues: T,
  watch: UseFormWatch<T>
) => {
  const watchedValues = watch()

  const isFormReadyForSubmit = useMemo(
    () =>
      Object.keys(initialValues).some(key => {
        const currentValue = watchedValues[key]
        const initialValue = initialValues[key]

        if (currentValue instanceof Date && initialValue instanceof Date) {
          return currentValue.getTime() !== initialValue.getTime()
        }

        if (
          typeof currentValue === 'string' &&
          typeof initialValue === 'string'
        ) {
          return currentValue.trim() !== initialValue.trim()
        }

        return currentValue !== initialValue
      }),
    [initialValues, watchedValues]
  )

  return { isFormReadyForSubmit }
}
