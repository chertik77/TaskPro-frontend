import type { ComponentProps } from 'react'

import { useState } from 'react'

import { cn } from '../lib/cn'
import { Icon } from './Icon'
import { Input } from './Input'

export const PasswordInput = ({
  className,
  ref,
  ...props
}: ComponentProps<'input'>) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='relative'>
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn('hide-password-toggle peer pr-[35px]', className)}
        {...props}
        ref={ref}
      />
      <button
        type='button'
        className='focus-visible:styled-outline absolute top-4 right-4.5 opacity-40
          peer-[.text-white]:text-white'
        onClick={() => setShowPassword(prev => !prev)}>
        {showPassword ? (
          <Icon
            name='eye-off'
            className='size-4.5'
          />
        ) : (
          <Icon
            name='eye'
            className='size-4.5'
          />
        )}
      </button>
    </div>
  )
}
