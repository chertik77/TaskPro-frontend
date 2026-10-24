import type { TargetAndTransition, Variants } from 'motion/react'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

const EASE_OUT_CSS = 'cubic-bezier(0.22, 1, 0.36, 1)'

const staggerUpTo = (interval: number, max: number) => (index: number) =>
  Math.min(index, max) * interval

export const columnListVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: staggerUpTo(0.06, 6) } }
}

export const columnVariants: Variants = {
  hidden: { opacity: 0, transform: 'translateY(16px) scale(0.98)' },
  show: {
    opacity: 1,
    transform: 'translateY(0px) scale(1)',
    transition: { duration: 0.45, ease: EASE_OUT, delayChildren: 0.08 }
  }
}

export const taskListVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: staggerUpTo(0.035, 8) } }
}

export const taskVariants: Variants = {
  hidden: { opacity: 0, transform: 'translateY(8px) scale(0.98)' },
  show: {
    opacity: 1,
    transform: 'translateY(0px) scale(1)',
    transition: { duration: 0.35, ease: EASE_OUT }
  }
}

export const itemExit: TargetAndTransition = {
  opacity: 0,
  transform: 'translateY(0px) scale(0.95)',
  transition: { duration: 0.2, ease: [0.4, 0, 1, 1] }
}

export const flipTiming: KeyframeAnimationOptions = {
  duration: 350,
  easing: EASE_OUT_CSS
}

export const sortableTransition = { duration: 250, easing: EASE_OUT_CSS }

export const dropTiming = { duration: 250, easing: EASE_OUT_CSS }
