import type { ComponentProps } from 'react'

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { cn } from 'cn'
import { XIcon } from 'lucide-react'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogContent = ({
  className,
  children,
  ...props
}: DialogPrimitive.Popup.Props) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Backdrop
      className='modal-backdrop fixed inset-0 isolate z-50'
    />
    <DialogPrimitive.Popup
      className={cn(
        `bg-white-soft modal-popup nested-dialog-dim tablet:w-87.5
        dark:border-accent/50 animate-nested-dialogs fixed top-1/2 left-1/2 z-50
        w-84 -translate-x-1/2 -translate-y-1/2 rounded-lg p-6
        data-nested-dialog-open:rounded-none contrast-more:border
        contrast-more:border-black/60 dark:border dark:bg-black
        dark:contrast-more:border-white`,
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
    className={cn('text-base text-black/50 dark:text-white/50', className)}
    {...props}
  />
)

export { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription }
