import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'

import { cn } from '@/shared/lib'

export const Label = ({
  className,
  render,
  ...props
}: useRender.ComponentProps<'span'>) =>
  useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(
          'inline-flex px-2 py-0.5 shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md text-[11px] whitespace-nowrap transition-al [&>svg]:pointer-events-none [&>svg]:size-3',
          className
        )
      },
      props
    ),
    render
  })
