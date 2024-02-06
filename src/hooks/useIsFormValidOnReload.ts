import { useEffect, useState } from 'react'
import type { FieldValues, UseFormTrigger } from 'react-hook-form'

export const useIsFormValidOnReload = <T extends FieldValues>(
  trigger: UseFormTrigger<T>
): { isFormValidOnReload: boolean } => {
  const [isFormValidOnReload, setIsFormValidOnReload] = useState(true)

  useEffect(() => {
    trigger().then(isValidOnLoad => {
      if (isValidOnLoad) {
        setIsFormValidOnReload(true)
      }
    })
  }, [trigger])

  return { isFormValidOnReload }
}
