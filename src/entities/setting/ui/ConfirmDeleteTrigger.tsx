// shared/ui/ConfirmDeleteTrigger.tsx
import type { ReactNode } from 'react'

import { cn } from '@/shared/lib'

import { useSettings } from '../model/useSettings'

type ConfirmDeleteTriggerProps = {
  onConfirm: () => void
  ariaLabel?: string
  className?: string
  children: ReactNode
}

export const ConfirmDeleteTrigger = ({
  onConfirm,
  ariaLabel,
  className,
  children
}: ConfirmDeleteTriggerProps) => {
  const confirmBeforeDelete = useSettings(
    state => state.general?.confirmBeforeDelete
  )

  if (!confirmBeforeDelete) {
    return (
      <button
        type='button'
        aria-label={ariaLabel}
        className={cn(
          `focus-visible:styled-outline hocus:text-black
          dark:hocus:text-white-soft dark:text-white-soft/50 text-black/50`,
          className
        )}
        onClick={onConfirm}>
        {children}
      </button>
    )
  }

  return children
}
