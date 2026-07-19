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

export const BROWSER_ICONS: Record<string, ElementType> = {
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
} as const
