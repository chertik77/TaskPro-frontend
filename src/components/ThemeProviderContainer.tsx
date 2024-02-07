import { ThemeProvider } from 'next-themes'
import type { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from 'redux/slices/user/user-slice'

export const ThemeProviderContainer = ({ children }: PropsWithChildren) => {
  const user = useSelector(selectUser)

  return (
    <ThemeProvider
      attribute='class'
      themes={['light', 'dark', 'violet']}
      defaultTheme={user.userTheme}>
      {children}
    </ThemeProvider>
  )
}
