import type { ComponentProps } from 'react'

import { cn } from '../lib'

const Table = ({ className, ...props }: ComponentProps<'table'>) => (
  <div className='relative w-full overflow-x-auto'>
    <table
      className={cn(
        'w-full text-base text-black/50 dark:text-white/50',
        className
      )}
      {...props}
    />
  </div>
)

const TableHeader = ({ className, ...props }: ComponentProps<'thead'>) => (
  <thead
    className={cn(
      'border-black/20 dark:border-white/20 [&_tr]:border-b',
      className
    )}
    {...props}
  />
)

const TableBody = ({ className, ...props }: ComponentProps<'tbody'>) => (
  <tbody
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
)

const TableRow = ({ className, ...props }: ComponentProps<'tr'>) => (
  <tr
    className={cn('border-b border-black/20 dark:border-white/20', className)}
    {...props}
  />
)

const TableHead = ({ className, ...props }: ComponentProps<'th'>) => (
  <th
    className={cn(
      'text-md h-10 px-3 text-left align-middle whitespace-nowrap',
      className
    )}
    {...props}
  />
)

const TableCell = ({ className, ...props }: ComponentProps<'td'>) => (
  <td
    className={cn('p-3 align-middle whitespace-nowrap', className)}
    {...props}
  />
)

export { Table, TableHeader, TableBody, TableHead, TableRow, TableCell }
