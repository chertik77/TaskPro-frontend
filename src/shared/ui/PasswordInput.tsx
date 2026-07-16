import type { ComponentProps } from 'react'

import { useState } from 'react'
import { DynamicIcon } from 'lucide-react/dynamic'

import { cn } from '../lib'
import { Input } from './Input'

export const PasswordInput = ({
  className,
  ...props
}: ComponentProps<'input'>) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='relative'>
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn('hide-password-toggle peer pr-8.75', className)}
        {...props}
      />
      <button
        type='button'
        className='focus-visible:styled-outline absolute top-4 right-4.5
          opacity-40 peer-[.text-white]:text-white'
        onClick={() => setShowPassword(prev => !prev)}>
        <DynamicIcon
          name={showPassword ? 'eye-off' : 'eye'}
          className='size-4.5'
        />
      </button>
    </div>
  )
}
