import type { ComponentProps } from 'react'

import { cn } from '../lib/cn'
import { Button } from './Button'
import { Icon } from './Icon'
import { Loader } from './Loader'

type PlusButtonWithLoaderProps = ComponentProps<'button'> & {
  shouldShowLoader?: boolean
}

export const PlusButtonWithLoader = ({
  className,
  children,
  shouldShowLoader,
  ...props
}: PlusButtonWithLoaderProps) => (
  <Button
    className={cn('gap-2', className)}
    {...props}>
    {shouldShowLoader ? (
      <Loader />
    ) : (
      <>
        <Icon
          name='plus-square'
          className='size-7 stroke-transparent'
        />
        {children}
      </>
    )}
  </Button>
)
