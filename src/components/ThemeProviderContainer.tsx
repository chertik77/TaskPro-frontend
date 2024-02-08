import { ThemeProvider } from 'next-themes'
import type { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from 'redux/slices/user/user-slice'

export const ThemeProviderContainer = ({ children }: PropsWithChildren) => {
  const theme = useSelector(selectTheme)
  return (
    <ThemeProvider
      attribute='class'
      themes={['light', 'dark', 'violet']}
      defaultTheme={theme}>
      {children}
    </ThemeProvider>
  )
}
