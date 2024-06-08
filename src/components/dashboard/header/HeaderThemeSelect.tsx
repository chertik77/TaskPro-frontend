import type { Theme } from 'constants/themes'

import { useTheme } from 'contexts/theme.context'

import { useChangeTheme } from 'hooks/user'

import { HeaderSelect } from './HeaderSelect'

export const HeaderThemeSelect = () => {
  const { theme, setTheme } = useTheme()

  const { mutate } = useChangeTheme()

  const handleThemeChange = (e: string) => {
    setTheme(e as Theme)
    mutate(e)
  }

  return (
    <HeaderSelect
      theme={theme}
      handleThemeChange={handleThemeChange}
    />
  )
}
