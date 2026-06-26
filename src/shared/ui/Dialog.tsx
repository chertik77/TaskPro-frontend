import type { ComponentProps } from 'react'

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'

import { cn } from '../lib'
import { Icon } from './Icon'

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
        z-50 backdrop-blur-md backdrop-saturate-150
        supports-[-webkit-touch-callout:none]:absolute'
    />
    <DialogPrimitive.Popup
      className={cn(
        `bg-white-soft data-open:animate-modal-in data-closed:animate-modal-out
        tablet:w-87.5 dark:border-brand/50 fixed top-1/2 left-1/2 z-50 w-84
        -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 dark:border
        dark:bg-black`,
        className
      )}
      {...props}>
      {children}
      <DialogPrimitive.Close
        className='focus-visible:styled-outline absolute top-3.5 right-3.5'
        aria-label='Close'>
        <Icon
          name='x'
          className='size-4.5'
        />
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
