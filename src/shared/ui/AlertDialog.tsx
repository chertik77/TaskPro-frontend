import type { ComponentProps } from 'react'

import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog'
import { cn } from 'cn'

import { Button } from './Button'

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogContent = ({
  className,
  children,
  ...props
}: AlertDialogPrimitive.Popup.Props) => (
  <AlertDialogPrimitive.Portal>
    <AlertDialogPrimitive.Backdrop
      className='modal-backdrop fixed inset-0 isolate z-50'
    />
    <AlertDialogPrimitive.Popup
      className={cn(
        `bg-white-soft modal-popup tablet:w-87.5 dark:border-accent/50 fixed
        top-1/2 left-1/2 z-50 w-84 -translate-x-1/2 -translate-y-1/2 rounded-lg
        p-6 contrast-more:border contrast-more:border-black/60 dark:border
        dark:bg-black dark:contrast-more:border-white`,
        className
      )}
      {...props}>
      {children}
    </AlertDialogPrimitive.Popup>
  </AlertDialogPrimitive.Portal>
)

const AlertDialogTitle = ({
  className,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Title>) => (
  <AlertDialogPrimitive.Title
    className={cn('mb-2 text-xl', className)}
    {...props}
  />
)

const AlertDialogDescription = ({
  className,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Description>) => (
  <AlertDialogPrimitive.Description
    className={cn('text-base text-black/50 dark:text-white/50', className)}
    {...props}
  />
)

const AlertDialogFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('mt-6 flex justify-end gap-3', className)}
    {...props}
  />
)

const AlertDialogCancel = ({
  className,
  ...props
}: ComponentProps<typeof Button>) => (
  <AlertDialogPrimitive.Close
    render={
      <Button
        className={cn(
          `enabled:hocus:bg-black/10 border-gray-light
          dark:enabled:hocus:bg-black-muted h-10 w-auto flex-1 border
          bg-transparent text-black dark:border-white/20 dark:text-white`,
          className
        )}
        {...props}
      />
    }
  />
)

const AlertDialogAction = ({
  className,
  ...props
}: ComponentProps<typeof Button>) => (
  <AlertDialogPrimitive.Close
    render={
      <Button
        className={cn('h-10 w-auto flex-1', className)}
        {...props}
      />
    }
  />
)

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
}
