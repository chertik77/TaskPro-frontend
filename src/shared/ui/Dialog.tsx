import type { ComponentProps } from 'react'

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { XIcon } from 'lucide-react'

import { cn } from '../lib'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogContent = ({
  className,
  children,
  ...props
}: DialogPrimitive.Popup.Props) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Backdrop
      className='data-open:animate-modal-overlay-in
        data-closed:animate-modal-overlay-out bg-black-overlay fixed inset-0
        isolate z-50 backdrop-blur-md backdrop-saturate-150'
    />
    <DialogPrimitive.Popup
      className={cn(
        `bg-white-soft data-open:animate-modal-in data-closed:animate-modal-out
        tablet:w-87.5 dark:border-accent/50 after:bg-black-overlay
        animate-nested-dialogs fixed top-1/2 left-1/2 z-50 w-84 -translate-x-1/2
        -translate-y-1/2 rounded-lg p-6 after:pointer-events-none after:absolute
        after:inset-0 after:opacity-0 after:backdrop-blur-md
        after:backdrop-saturate-150 after:transition-opacity
        data-nested-dialog-open:rounded-none
        data-nested-dialog-open:after:opacity-100 dark:border dark:bg-black`,
        className
      )}
      {...props}>
      {children}
      <DialogPrimitive.Close
        className='focus-visible:styled-outline absolute top-3.5 right-3.5'
        aria-label='Close'>
        <XIcon className='size-4.5' />
      </DialogPrimitive.Close>
    </DialogPrimitive.Popup>
  </DialogPrimitive.Portal>
)

const DialogTitle = ({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title
    className={cn('mb-6 text-xl', className)}
    {...props}
  />
)

const DialogDescription = ({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) => (
  <DialogPrimitive.Description
    className={cn('text-sm', className)}
    {...props}
  />
)

export { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription }
