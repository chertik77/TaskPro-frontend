import type { AuthResponse } from 'types'

import { useTheme } from 'next-themes'
import { useDispatch } from 'react-redux'

import { useAppMutation } from 'hooks'

import { updateUser } from 'redux/user.slice'

import { userService } from 'services'

import { HeaderSelect } from './HeaderSelect'

export const HeaderThemeSelect = () => {
  const dispatch = useDispatch()

  const { setTheme, theme } = useTheme()

  const { mutateAsync } = useAppMutation<string, AuthResponse>({
    mutationKey: ['user'],
    mutationFn: theme => userService.changeUserTheme(theme)
  })

  const handleThemeChange = (e: string) => {
    setTheme(e)
    mutateAsync(e).then(r => dispatch(updateUser(r.user)))
  }

  return (
    <HeaderSelect
      theme={theme!}
      handleThemeChange={handleThemeChange}
    />
  )
}
