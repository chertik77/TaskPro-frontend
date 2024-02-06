import { valibotResolver } from '@hookform/resolvers/valibot'
import {
  signupSchema,
  type SignupSchemaFields
} from 'lib/schemas/signup-schema'
import { useForm } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'

export const useSignupForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid }
  } = useForm<SignupSchemaFields>({
    resolver: valibotResolver(signupSchema),
    mode: 'onChange'
  })

  useFormPersist('sign-up-form', {
    watch,
    setValue,
    storage: window.localStorage
  })

  return { register, handleSubmit, errors, isValid, reset, trigger }
}
