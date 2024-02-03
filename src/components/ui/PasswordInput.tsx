import { forwardRef, useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { Field } from './field/Field'

export const PasswordInput = forwardRef<
  HTMLInputElement,
  { inputPasswordPlaceholder?: string }
>(({ inputPasswordPlaceholder }, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='relative'>
      <Field
        inputName='password' //TODO: Add inputName to React Hook Form
        type={showPassword ? 'text' : 'password'}
        placeholder={inputPasswordPlaceholder}
        className='hide-password-toggle pr-[35px]'
        ref={ref}
      />
      <button
        type='button'
        className='absolute right-[18px] top-4'
        onClick={() => setShowPassword(prev => !prev)}>
        {showPassword ? (
          <FiEyeOff className='h-[18px] w-[18px] opacity-40' />
        ) : (
          <FiEye className='h-[18px] w-[18px] opacity-40' />
        )}
      </button>
    </div>
  )
})
