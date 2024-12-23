import type { FieldValues, UseFormWatch } from 'react-hook-form'

import { useEffect, useState } from 'react'

export const useSubmitDisabled = <T extends FieldValues>(
  watch: UseFormWatch<T>,
  initialValues: T
) => {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)

  useEffect(() => {
    const currentValues = watch()

    const isFormChanged = Object.keys(initialValues).some(
      key => currentValues[key] !== initialValues[key]
    )

    setIsSubmitDisabled(!isFormChanged)
  }, [watch, initialValues])

  return { isSubmitDisabled }
}
