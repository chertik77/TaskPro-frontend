import type { Theme } from '@/shared/config'

export const DEFAULT_AVATAR_URL: Record<Exclude<Theme, 'system'>, string> = {
  light:
    'https://res.cloudinary.com/dmbnnewoy/image/upload/v1706958682/TaskPro/user_avatar_default/user_light.png',
  dark: 'https://res.cloudinary.com/dmbnnewoy/image/upload/v1706958682/TaskPro/user_avatar_default/user_dark.png'
} as const
