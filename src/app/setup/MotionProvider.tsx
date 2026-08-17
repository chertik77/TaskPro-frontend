import type { ReactNode } from 'react'

import { domAnimation, LazyMotion } from 'motion/react'

export const MotionProvider = ({ children }: { children: ReactNode }) => (
  <LazyMotion features={domAnimation}>{children}</LazyMotion>
)
