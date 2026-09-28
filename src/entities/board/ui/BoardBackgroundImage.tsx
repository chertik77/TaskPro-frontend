import { cn } from 'cn'

import { useSettings } from '@/entities/setting/@x/board'

export const BoardBackgroundImage = ({ url }: { url: string | null }) => {
  const { data: backgroundBlur } = useSettings(
    select => select.general.boardBackgroundBlur
  )

  return (
    <div
      className={cn('absolute inset-0 -z-10 scale-110 bg-cover bg-center', [
        {
          'blur-sm': backgroundBlur === 'low',
          'blur-md': backgroundBlur === 'medium'
        }
      ])}
      style={{ backgroundImage: url ? `url(${url})` : undefined }}
    />
  )
}
