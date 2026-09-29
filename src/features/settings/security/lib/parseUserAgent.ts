import { UAParser } from 'ua-parser-js'

export const parseUserAgent = (userAgent: string | null | undefined) => {
  if (!userAgent) return { browser: '', os: '' }

  const parser = new UAParser(userAgent)

  const browser = parser.getBrowser()
  const os = parser.getOS()

  return { browser: browser.name ?? '', os: os.name ?? '' }
}
