import { cn } from 'lib'

export const Loader = ({ className }: { className?: string }) => (
  <div
    className={cn(
      `inline-block size-7 animate-spin rounded-full border-4 border-solid
      border-current border-r-transparent`,
      className
    )}
    role='status'>
    <span className='sr-only'>Loading...</span>
  </div>
)
