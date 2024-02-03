import { useForm } from 'react-hook-form'
import { Button } from 'components/ui/button/Button'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, email, string, minLength, toTrimmed, maxLength } from 'valibot'

type FormFields = {
  email: string
  password: string
}

const LoginSchema = object({
  email: string([toTrimmed(), email('Please enter a valid email.')]),
  password: string('password is required', [
    toTrimmed(),
    minLength(8, 'Password should be at least 8 characters'),
    maxLength(64, 'Password is too long')
  ])
})

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormFields>({
    resolver: valibotResolver(LoginSchema),
    shouldUseNativeValidation: false
  })

  const onSubmit = (data: FormFields) => {
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email')}
        type='email'
        placeholder='Enter your email'
      />
      {errors.email && (
        <div className='text-red-500'>{errors.email.message}</div>
      )}
      <input
        {...register('password')}
        type='password'
        placeholder='Confirm a password'
      />
      {errors.password && (
        <div className='text-red-500'>{errors.password.message}</div>
      )}
      <Button type='submit'>Log In Now</Button>
    </form>
  )
}
