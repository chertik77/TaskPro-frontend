import type { Dispatch, SetStateAction } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parse } from 'valibot'

import { UserContracts, userQueries, userService } from '@/entities/user'

export const useEditProfile = (
  setIsDialogOpen?: Dispatch<SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userService.editUser,
    meta: {
      successMessage: 'Your profile has been successfully updated.',
      errorMessage: e =>
        e?.response?.status === 409
          ? 'An account with this email address already exists. Please use a different email.'
          : 'Failed to update profile. Please try again. If the problem persists, contact support.'
    },
    onMutate: async editedUser => {
      await queryClient.cancelQueries({ queryKey: userQueries.current() })

      const previousUser = queryClient.getQueryData(userQueries.current())

      const parsedPreviousUser = parse(UserContracts.UserSchema, previousUser)

      queryClient.setQueryData(userQueries.current(), oldUser => {
        if (!oldUser) return oldUser

        const parsedOldUser = parse(UserContracts.UserSchema, oldUser)

        return { ...parsedOldUser, editedUser }
      })

      return { previousUser: parsedPreviousUser }
    },
    onSuccess: () => {
      setIsDialogOpen?.(false)
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(userQueries.current(), context?.previousUser)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userQueries.current() })
    }
  })
}
