import { useEffect } from 'react'

const WEBSITE_TITLE = 'TaskPro: Best Task Management Tool to Boost Productivity'

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
