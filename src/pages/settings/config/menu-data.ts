import { Palette, UserRound, UserRoundKey } from 'lucide-react'

export const MENU_DATA = [
  { name: 'Profile', icon: UserRound, href: '/profile' },
  { name: 'Appearance', icon: Palette, href: '/appearance' },
  { name: 'Security & Access', icon: UserRoundKey, href: '/security' }
] as const
