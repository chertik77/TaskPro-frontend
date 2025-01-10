import type { PropsWithChildren } from 'react'

import * as Tooltip from '@radix-ui/react-tooltip'

export const TooltipWrapper = ({
  children,
  tooltipText
}: PropsWithChildren<{ tooltipText: string }>) => (
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className='select-none rounded bg-white-gray px-3 py-2.5 dark:bg-black-third'
          sideOffset={5}>
          {tooltipText}
          <Tooltip.Arrow className='fill-white-gray dark:fill-black-third' />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
)
