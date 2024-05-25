import { createContext, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectUser } from 'redux/user.slice'

export type Theme = 'dark' | 'light' | 'violet'

type ThemeProviderProps = {
  children: React.ReactNode
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | null>(null)

export function ThemeProvider({ children }: ThemeProviderProps) {
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
