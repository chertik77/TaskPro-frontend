import type { Variants } from 'motion/react'

import { stagger } from 'motion/react'

export const formVariants: Record<'container' | 'field', Variants> = {
  container: {
    hidden: {},
    show: { transition: { delayChildren: stagger(0.08) } }
  },
  field: {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
    }
  }
}
