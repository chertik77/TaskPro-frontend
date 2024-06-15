import * as ScrollArea from '@radix-ui/react-scroll-area'

import { cn } from 'lib'

type CustomScrollbarProps = Pick<
  ScrollArea.ScrollAreaScrollbarVisibleProps,
  'orientation'
> & {
  backgroundIdentifier?: string
  scrollBarClassName?: string
  thumbClassName?: string
}

export const CustomScrollbar = ({
  scrollBarClassName,
  thumbClassName,
  backgroundIdentifier,
  orientation = 'vertical'
}: CustomScrollbarProps) => (
  <ScrollArea.Scrollbar
    className={cn(
      'rounded-xl bg-scroll-white violet:bg-white dark:bg-scroll-white/50',
      scrollBarClassName,
      backgroundIdentifier === 'default' && 'dark:bg-white/5',
      backgroundIdentifier === 'light-sky' && 'bg-white dark:bg-white'
    )}
    orientation={orientation}>
    <ScrollArea.Thumb
      className={cn(
        'rounded-xl bg-black/30 violet:bg-brand-third dark:bg-black-secondary',
        thumbClassName,
        backgroundIdentifier === 'default' && 'bg-black/10'
      )}
    />
  </ScrollArea.Scrollbar>
)
