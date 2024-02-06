import { valibotResolver } from '@hookform/resolvers/valibot'
import {
  signinSchema,
  type SigninSchemaFields
} from 'lib/schemas/signin-schema'
import { useForm } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'

export const useSigninForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    trigger,
    formState: { errors, isValid }
  } = useForm<SigninSchemaFields>({
    resolver: valibotResolver(signinSchema),
    mode: 'onChange'
  })

  useFormPersist('sign-in-form', {
    watch,
    setValue,
    storage: window.localStorage
  })

  return { register, handleSubmit, errors, isValid, reset, trigger }
}
