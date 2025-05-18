import type { ComponentProps } from 'react'

import * as DialogPrimitive from '@radix-ui/react-dialog'

import { cn } from '../lib/cn'
import { Icon } from './Icon'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogClose = DialogPrimitive.Close

const DialogContent = ({
  className,
  children,
  ref,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content>) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay
      className='data-[state=open]:animate-modal-overlay-in
        data-[state=closed]:animate-modal-overlay-out fixed inset-0 z-50 bg-[#00000080]
        backdrop-blur-md backdrop-saturate-150'
    />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        `bg-white-soft data-[state=open]:animate-modal-in
        data-[state=closed]:animate-modal-out tablet:w-[350px] fixed top-1/2 left-1/2
        z-50 w-84 -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 dark:bg-black`,
        className
      )}
      {...props}>
      {children}
      <DialogPrimitive.Close className='focus-visible:styled-outline absolute top-3.5 right-3.5'>
        <Icon
          name='x'
          className='size-4.5 stroke-black dark:stroke-white'
        />
        <span className='sr-only'>Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
)

const DialogTitle = ({
  className,
  ref,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('mb-6 text-xl', className)}
    {...props}
  />
)

export { Dialog, DialogClose, DialogTrigger, DialogContent, DialogTitle }
