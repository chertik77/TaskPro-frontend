import { useEffect, useState } from 'react'
import type { FieldValues, UseFormTrigger } from 'react-hook-form'

export const useIsFormValidOnReload = <T extends FieldValues>(
  trigger: UseFormTrigger<T>
) => {
  const [isFormValidOnReload, setIsFormValidOnReload] = useState(false)

  useEffect(() => {
    trigger().then(setIsFormValidOnReload)
  }, [trigger])

  return { isFormValidOnReload }
}
