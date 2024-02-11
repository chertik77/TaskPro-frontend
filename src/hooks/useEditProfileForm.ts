import { valibotResolver } from '@hookform/resolvers/valibot'
import {
  signupSchema,
  type SignupSchemaFields
} from 'lib/schemas/signup-schema'
import { useForm } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'
interface FormDefaultValues {
  name: string
  email: string
  password: string
}

export const useEditProfileForm = ({
  defaultValues
}: {
  defaultValues: FormDefaultValues
}) => {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<SignupSchemaFields>({
    resolver: valibotResolver(signupSchema),
    mode: 'onChange',
    defaultValues: defaultValues
  })

  useFormPersist('edit-profile-form', {
    watch,
    setValue,
    storage: window.localStorage
  })

  return { register, handleSubmit, errors, isValid, reset, trigger }
}
