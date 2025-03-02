import type { FieldValues, UseFormWatch } from 'react-hook-form'

import { useMemo } from 'react'

export const useIsFormReadyForSubmit = <T extends FieldValues>(
  initialValues: T,
  watch: UseFormWatch<T>,
  extraValidation?: (values: T) => boolean
) => {
  const watchedValues = watch()

  const isFormReadyForSubmit = useMemo(() => {
    const hasChanged = Object.keys(initialValues).some(key => {
      const currentValue = watchedValues[key]
      const initialValue = initialValues[key]

      if (currentValue instanceof Date && initialValue instanceof Date) {
        return currentValue.getTime() !== initialValue.getTime()
      }

      return currentValue !== initialValue
    })

    return hasChanged && extraValidation?.(watchedValues)
  }, [initialValues, extraValidation, watchedValues])

  return { isFormReadyForSubmit }
}
