import { useEffect, useState } from 'react'

type TriggerFunction = () => Promise<boolean>

export const useFormValidCheck = (trigger: TriggerFunction): boolean => {
  const [validOnReload, setValidOnReload] = useState(true)

  useEffect(() => {
    const checkValidOnLoad = async () => {
      const isValidOnLoad = await trigger()
      if (isValidOnLoad) {
        setValidOnReload(true)
      }
    }
    checkValidOnLoad()
  }, [trigger])

  return validOnReload
}
