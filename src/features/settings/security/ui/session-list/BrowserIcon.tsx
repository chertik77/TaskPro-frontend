import { Globe } from 'lucide-react'

import { BROWSER_ICONS } from '../../config/browser-icons'

export const BrowserIcon = ({ browser }: { browser?: string }) => {
  const icon = BROWSER_ICONS[browser as keyof typeof BROWSER_ICONS]

  if (!icon) return <Globe className='size-5' />

  const Icon = icon

  return <Icon className='size-5' />
}
