import type { TargetAndTransition, Variants } from 'motion/react'

import { EASE_IN_OUT_CSS, EASE_OUT, EASE_OUT_CSS } from '@/shared/lib'

const staggerUpTo = (interval: number, max: number) => (index: number) =>
  Math.min(index, max) * interval

export const columnListVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: staggerUpTo(0.04, 5) } }
}

export const columnVariants: Variants = {
  hidden: { opacity: 0, transform: 'translateY(8px)' },
  show: {
    opacity: 1,
    transform: 'translateY(0px)',
    transition: { duration: 0.2, ease: EASE_OUT }
  }
}

export const taskListVariants: Variants = {
  hidden: {},
  show: {}
}

export const taskVariants: Variants = {
  hidden: { opacity: 0, transform: 'translateY(4px) scale(0.98)' },
  show: {
    opacity: 1,
    transform: 'translateY(0px) scale(1)',
    transition: { duration: 0.2, ease: EASE_OUT }
  }
}

export const itemExit: TargetAndTransition = {
  opacity: 0,
  transform: 'translateY(0px) scale(0.95)',
  transition: { duration: 0.15, ease: EASE_OUT }
}

export const flipTiming: KeyframeAnimationOptions = {
  duration: 250,
  easing: EASE_IN_OUT_CSS
}

export const sortableTransition = { duration: 250, easing: EASE_OUT_CSS }

export const dropTiming = { duration: 250, easing: EASE_OUT_CSS }
