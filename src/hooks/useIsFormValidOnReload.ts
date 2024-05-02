import type {
  FieldValues,
  UseFormClearErrors,
  UseFormTrigger
} from 'react-hook-form'

import { useEffect, useState } from 'react'

export const useIsFormValidOnReload = <T extends FieldValues>(
  trigger: UseFormTrigger<T>,
  clearErrors: UseFormClearErrors<T>
): { isFormValidOnReload: boolean } => {
  const [isFormValidOnReload, setIsFormValidOnReload] = useState(true)

  useEffect(() => {
    trigger().then(isValidOnLoad => {
      clearErrors()
      if (isValidOnLoad) {
        setIsFormValidOnReload(true)
      }
    })
  }, [clearErrors, trigger])

  return { isFormValidOnReload }
}
