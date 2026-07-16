import type { ComponentProps } from 'react'

import { PlusIcon } from 'lucide-react'

import { cn } from '../lib'
import { Button } from './Button'
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
        <span
          className='grid size-7 place-items-center rounded-md bg-black
            text-white'>
          <PlusIcon className='size-4' />
        </span>
        {children}
      </>
    )}
  </Button>
)
