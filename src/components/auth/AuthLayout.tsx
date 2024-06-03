import type { PropsWithChildren } from 'react'

export const AuthLayout = ({ children }: PropsWithChildren) => (
  <div className='flex h-dvh items-center justify-center bg-welcome-page-gradient'>
    <div className='w-8xl rounded-lg bg-black p-6 tablet:w-[424px] tablet:p-10'>
      {children}
    </div>
  </div>
)
