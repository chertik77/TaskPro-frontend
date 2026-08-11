import type { LucideIcon } from 'lucide-react'
import type { ToastType } from '../lib/toast/toast'

import { Toast as ToastPrimitive } from '@base-ui/react/toast'
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  XIcon
} from 'lucide-react'

import { cn } from '../lib/class-names/cn'
import { toastManager } from '../lib/toast/toast'

const TYPE_ICONS: Record<ToastType, LucideIcon> = {
  success: CircleCheckIcon,
  error: CircleAlertIcon,
  info: InfoIcon,
  warning: TriangleAlertIcon
}

const TYPE_COLORS: Record<ToastType, string> = {
  success: 'text-emerald-600 dark:text-emerald-400',
  error: 'text-rose-600 dark:text-rose-400',
  info: 'text-sky-600 dark:text-sky-400',
  warning: 'text-amber-600 dark:text-amber-400'
}

const ToastIcon = ({ type }: { type: string | undefined }) => {
  const Icon = TYPE_ICONS[type as ToastType]

  if (!Icon) return null

  return (
    <span
      className={cn(
        'grid size-7 shrink-0 place-content-center rounded-full bg-current/10',
        TYPE_COLORS[type as ToastType]
      )}>
      <Icon className='size-4' />
    </span>
  )
}

const ToastList = () => {
  const { toasts } = ToastPrimitive.useToastManager()

  return toasts.map(toast => (
    <ToastPrimitive.Root
      key={toast.id}
      toast={toast}
      swipeDirection={['up', 'down', 'right']}
      className='group/toast focus-visible:styled-outline bg-white-soft
        shadow-base dark:bg-black-deep desktop:top-auto desktop:bottom-0
        desktop:origin-bottom desktop:[--dir:-1] desktop:[--exit:1]
        desktop:after:top-full desktop:after:bottom-auto pointer-events-auto
        absolute top-0 right-0 z-[calc(1000-var(--toast-index))] h-(--height)
        w-full origin-top
        transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+var(--dir)*(var(--toast-index)*var(--peek))+var(--dir)*(var(--shrink)*var(--height))))_scale(var(--scale))]
        rounded-lg border border-black/10 will-change-transform outline-none
        select-none [--dir:1] [--exit:-1] [--gap:0.75rem]
        [--height:var(--toast-frontmost-height,var(--toast-height))]
        [--offset-y:calc(var(--dir)*var(--toast-offset-y)+var(--dir)*var(--toast-index)*var(--gap)+var(--toast-swipe-movement-y))]
        [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))]
        [--shrink:calc(1-var(--scale))]
        [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]
        after:absolute after:bottom-full after:left-0
        after:h-[calc(var(--gap)+1px)] after:w-full
        data-expanded:h-(--toast-height)
        data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]
        data-limited:opacity-0
        data-starting-style:transform-[translateY(calc(var(--exit)*150%))]
        data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]
        data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]
        data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]
        data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]
        data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]
        data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]
        data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]
        data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]
        dark:border-white/10
        [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(calc(var(--exit)*150%))]'>
      <ToastPrimitive.Content
        className='flex h-full items-start gap-3 overflow-hidden p-4
          transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]
          data-behind:opacity-0 data-expanded:opacity-100'>
        <ToastIcon type={toast.type} />
        <div className='flex min-w-0 flex-1 flex-col gap-1 text-balance'>
          <ToastPrimitive.Title className='font-medium' />
          <ToastPrimitive.Description
            className='text-md text-black/60 dark:text-white/50'
          />
        </div>
        <ToastPrimitive.Close
          aria-label='Close notification'
          className='focus-visible:styled-outline hocus:text-black
            dark:hocus:text-white relative shrink-0 pt-1 text-black/40
            transition-colors after:absolute after:-inset-2 dark:text-white/40'>
          <XIcon className='size-4' />
        </ToastPrimitive.Close>
      </ToastPrimitive.Content>
    </ToastPrimitive.Root>
  ))
}

export const Toaster = () => (
  <ToastPrimitive.Provider toastManager={toastManager}>
    <ToastPrimitive.Portal>
      <ToastPrimitive.Viewport
        className='desktop:top-auto desktop:right-6 desktop:bottom-6
          desktop:left-auto desktop:mx-0 desktop:w-full pointer-events-none
          fixed inset-x-4 top-4 z-1000 mx-auto w-auto max-w-89 outline-none'>
        <ToastList />
      </ToastPrimitive.Viewport>
    </ToastPrimitive.Portal>
  </ToastPrimitive.Provider>
)
