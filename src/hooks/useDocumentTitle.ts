import { useEffect } from 'react'

const WEBSITE_NAME = 'TaskPro'

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ${WEBSITE_NAME}`
    }

    return () => {
      document.title = WEBSITE_NAME
    }
  }, [title])
}
