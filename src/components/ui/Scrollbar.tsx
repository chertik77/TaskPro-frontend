import * as ScrollArea from '@radix-ui/react-scroll-area'

import { cn } from 'lib'

type ScrollbarProps = {
  orientation?: 'vertical' | 'horizontal'
  scrollBarClassName?: string
  thumbClassName?: string
  backgroundIdentifier?: string
}

export const Scrollbar = ({
  scrollBarClassName,
  backgroundIdentifier,
  thumbClassName,
  orientation = 'vertical'
}: ScrollbarProps) => (
  <ScrollArea.Scrollbar
    className={cn('bg-transparent', scrollBarClassName)}
    orientation={orientation}>
    <ScrollArea.Thumb
      className={cn(
        'rounded-xl bg-white/80',
        backgroundIdentifier === 'default' && 'bg-scroll-white',
        thumbClassName
      )}
    />
  </ScrollArea.Scrollbar>
)
