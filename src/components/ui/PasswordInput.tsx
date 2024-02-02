import { cn } from 'lib/utils'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { Field } from './Field'

export const PasswordInput = forwardRef<
  HTMLInputElement,
  { className?: string }
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='relative w-[287px] pt-5'>
      <Field
        type={showPassword ? 'text' : 'password'}
        className={cn(
          'hide-password-toggle w-[287px] h-[49px] text-white border-opacity-40 bg-black-third placeholder:opacity-40',
          className
        )}
        placeholder='Enter password'
        ref={ref}
        {...props}
      />
      <button
        type='button'
        className='absolute right-[18px] top-[50%]'
        onClick={() => setShowPassword(prev => !prev)}>
        {showPassword ? (
          <EyeOffIcon
            color='white'
            className='h-[18px] w-[18px] opacity-40'
            aria-hidden='true'
          />
        ) : (
          <EyeIcon
            color='white'
            className='h-[18px] w-[18px] opacity-40'
            aria-hidden='true'
          />
        )}
      </button>
    </div>
  )
})
