import type { UserDtoTypes } from '@/entities/user'
import type { UseMutateFunction } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { EditUserSchema } from './contract'

export type EditUserMutateFunction = UseMutateFunction<
  EditUserSchema,
  AxiosError,
  UserDtoTypes.EditUserDto
>
