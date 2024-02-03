import { Button } from 'components/ui/button/Button'
import { useForm } from 'react-hook-form'

type FormFields = {
  name: string
  email: string
  password: string
}

export const RegisterForm = () => {
  const { register, handleSubmit } = useForm<FormFields>()

  const onSubmit = (data: FormFields) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('name', { required: true })}
        type='text'
        placeholder='Enter your name'
      />
      <input
        {...register('email', { required: true })}
        type='email'
        placeholder='Enter your email'
      />
      <input
        {...register('password', { required: true })}
        type='password'
        placeholder='Create a password'
      />
      <Button type='submit'>Regiter Now</Button>
    </form>
  )
}
