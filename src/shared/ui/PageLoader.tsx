import { cn } from 'cn'

import { Loader } from './Loader'

type PageLoaderProps = {
  variant?: 'themed' | 'brand'
}

export const PageLoader = ({ variant = 'themed' }: PageLoaderProps) => (
  <div
    className={cn(
      'fixed inset-0 flex min-h-dvh items-center justify-center',
      variant === 'brand'
        ? 'bg-soft-green'
        : 'bg-white-muted dark:bg-black-muted'
    )}>
    <Loader
      className={cn(
        'size-12 stroke-black',
        variant === 'themed' && 'dark:stroke-white'
      )}
    />
  </div>
)
