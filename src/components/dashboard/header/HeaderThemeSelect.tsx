import { useMutation } from '@tanstack/react-query'
import { useTheme } from 'next-themes'
import { updateUser } from 'redux/slices/user/user-slice'

import { useAppDispatch } from 'hooks'

import { userService } from 'services/user.service'

import { Select, SelectContent, SelectTrigger } from './HeaderSelectComponents'

export const HeaderThemeSelect = () => {
  const dispatch = useAppDispatch()

  const { setTheme, theme } = useTheme()

  const { mutateAsync } = useMutation({
    mutationKey: ['user'],
    mutationFn: (theme: string) => userService.changeUserTheme(theme)
  })

  const handleThemeChange = (e: string) => {
    setTheme(e)
    mutateAsync(e).then(r => dispatch(updateUser(r.user)))
  }

  return (
    <Select
      onValueChange={handleThemeChange}
      defaultValue={theme}>
      <SelectTrigger />
      <SelectContent />
    </Select>
  )
}
