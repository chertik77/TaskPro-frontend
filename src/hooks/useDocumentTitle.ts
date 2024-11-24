import { useEffect } from 'react'

const WEBSITE_NAME = 'TaskPro'

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} | ${WEBSITE_NAME}`
  }, [title])

  return null
}
