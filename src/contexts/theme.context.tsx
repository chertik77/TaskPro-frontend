import type { Theme } from 'constants/themes'
import type { PropsWithChildren } from 'react'

import { createContext, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectUser } from 'redux/user.slice'

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const { theme: userTheme } = useSelector(selectUser)

  const [theme, setTheme] = useState<Theme>(userTheme as Theme)

  useEffect(() => {
    const root = window.document.documentElement

    root.className = ''

    root.classList.add(userTheme)
  }, [userTheme, theme])

  const value = {
    theme: userTheme as Theme,
    setTheme: (theme: Theme) => setTheme(theme)
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
