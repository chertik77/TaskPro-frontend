import type { ReactNode } from 'react'

import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'

export const MotionProvider = ({ children }: { children: ReactNode }) => (
  <LazyMotion features={domAnimation}>
    <MotionConfig reducedMotion='user'>{children}</MotionConfig>
  </LazyMotion>
)
