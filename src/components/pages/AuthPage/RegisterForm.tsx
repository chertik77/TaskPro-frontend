import { valibotResolver } from '@hookform/resolvers/valibot'
import { Button } from 'components/ui/button/Button'
import { useForm } from 'react-hook-form'
import { useSignupMutation } from 'redux/api/user'
import {
  custom,
  maxLength,
  minLength,
  object,
  string,
  toTrimmed
} from 'valibot'
import validator from 'validator'

type FormFields = {
  name: string
  email: string
  password: string
}

const RegisterSchema = object({
  name: string([
    toTrimmed(),
    minLength(2, 'Name should be at least 2 characters'),
    maxLength(32, 'Name is too long')
  ]),
  email: string([
    toTrimmed(),
    custom(validator.isEmail, 'Please enter a valid email.')
  ]),
  password: string([
    toTrimmed(),
    minLength(8, 'Password should be at least 8 characters'),
    maxLength(64, 'Password is too long')
  ])
})

export const RegisterForm = () => {
  const [signup] = useSignupMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormFields>({
    resolver: valibotResolver(RegisterSchema),
    shouldUseNativeValidation: false
  })

  const onSubmit = (data: FormFields) => {
    signup(data)
    // console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} type='text' placeholder='Enter your name' />
      {errors.name && <div className='text-red-500'>{errors.name.message}</div>}
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
        placeholder='Create a password'
      />
      {errors.password && (
        <div className='text-red-500'>{errors.password.message}</div>
      )}
      <Button type='submit' disabled={!isValid}>
        Regiter Now
      </Button>
    </form>
  )
}
