import type { ReactNode } from 'react'

import { cn } from '@/shared/lib'

import { useSettings } from '../model/useSettings'

type ConfirmDeleteTriggerProps = {
  onConfirm: () => void
  ariaLabel?: string
  className?: string
  isDisabled?: boolean
  children: ReactNode
}

export const ConfirmDeleteTrigger = ({
  onConfirm,
  ariaLabel,
  className,
  isDisabled,
  children
}: ConfirmDeleteTriggerProps) => {
  const confirmBeforeDelete = useSettings(
    state => state.general.confirmBeforeDelete
  )

  if (!confirmBeforeDelete) {
    return (
      <button
        type='button'
        aria-label={ariaLabel}
        disabled={isDisabled}
        className={cn(
          `focus-visible:styled-outline enabled:hocus:text-black
          dark:enabled:hocus:text-white-soft dark:text-white-soft/50
          text-black/50 disabled:cursor-not-allowed disabled:opacity-50`,
          className
        )}
        onClick={onConfirm}>
        {children}
      </button>
    )
  }

  return children
}
