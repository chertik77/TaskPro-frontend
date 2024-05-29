import type { Theme } from 'constants/themes'
import type { User } from 'types'

import { useTheme } from 'contexts/theme.context'
import { useDispatch } from 'react-redux'

import { useAppMutation } from 'hooks'

import { updateUser } from 'redux/user.slice'

import { userService } from 'services'

import { HeaderSelect } from './HeaderSelect'

export const HeaderThemeSelect = () => {
  const dispatch = useDispatch()

  const { theme, setTheme } = useTheme()

  const { mutateAsync } = useAppMutation<string, User>({
    mutationKey: ['user'],
    mutationFn: theme => userService.changeUserTheme(theme),
    toastErrorMessage:
      'There was an error changing the theme. Please try again.'
  })

  const handleThemeChange = (e: string) => {
    setTheme(e as Theme)
    mutateAsync(e).then(r => dispatch(updateUser(r)))
  }

  return (
    <HeaderSelect
      theme={theme!}
      handleThemeChange={handleThemeChange}
    />
  )
}
