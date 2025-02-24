import type { ButtonHTMLAttributes } from 'react'

import { cn } from '../lib/cn'
import { Button } from './Button'
import { Icon } from './Icon'
import { Loader } from './Loader'

type PlusButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  shouldShowLoader?: boolean
}

export const PlusButton = ({
  className,
  children,
  shouldShowLoader,
  ...props
}: PlusButtonProps) => (
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
