import {
  ListTodo,
  PersonStanding,
  Settings2,
  Tag,
  UserRound,
  UserRoundKey
} from 'lucide-react'

export const MENU_DATA = [
  { name: 'General', icon: Settings2, href: '/general' },
  { name: 'Profile', icon: UserRound, href: '/profile' },
  { name: 'Labels', icon: Tag, href: '/labels' },
  { name: 'Task Preferences', icon: ListTodo, href: '/task' },
  { name: 'Security & Access', icon: UserRoundKey, href: '/security' },
  { name: 'Accessibility', icon: PersonStanding, href: '/accessibility' }
] as const
