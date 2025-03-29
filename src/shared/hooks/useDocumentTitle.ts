import { useEffect } from 'react'

const WEBSITE_TITLE = 'TaskPro: Get Organized, Get Productive'

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ${WEBSITE_TITLE}`
    }

    return () => {
      document.title = WEBSITE_TITLE
    }
  }, [title])
}
