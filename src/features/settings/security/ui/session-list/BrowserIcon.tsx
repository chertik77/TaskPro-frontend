import type { ElementType } from 'react'

import {
  Bing,
  BraveBrowser,
  Chrome,
  Chromium,
  Duckduckgo,
  Ecosia,
  FirefoxBrowser,
  MicrosoftEdge,
  Opera,
  Safari,
  SamsungBrowser,
  Vivaldi
} from '@thesvg/react'
import { Globe } from 'lucide-react'

const browserIcons: Record<string, ElementType> = {
  Chrome,
  Safari,
  Firefox: FirefoxBrowser,
  Edge: MicrosoftEdge,
  Brave: BraveBrowser,
  Opera,
  Bing,
  Vivaldi,
  DuckDuckGo: Duckduckgo,
  Chromium,
  Ecosia,
  'Samsung Internet': SamsungBrowser,
  'Mobile Chrome': Chrome,
  'Mobile Firefox': FirefoxBrowser,
  'Mobile Safari': Safari
}

export const BrowserIcon = ({ browser }: { browser?: string }) => {
  const icon = browserIcons[browser as keyof typeof browserIcons]

  if (!icon) return <Globe className='size-5' />

  const Icon = icon

  return <Icon className='size-5' />
}
