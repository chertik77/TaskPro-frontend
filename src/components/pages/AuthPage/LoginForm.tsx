import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from 'components/ui/Button'

type FormFields = {
  email: string
  password: string
}

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<FormFields>()

  const onSubmit: SubmitHandler<FormFields> = data => {
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Button type='submit'>Log In Now</Button>
    </form>
  )
}
