import type { PropsWithChildren } from 'react'

import { createContext, useContext, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

type SidebarProviderState = {
  isSidebarOpen: boolean
  setIsSidebarOpen: (value: boolean) => void
}

const initialState: SidebarProviderState = {
  isSidebarOpen: true,
  setIsSidebarOpen: () => null
}

const SidebarProviderContext = createContext<SidebarProviderState>(initialState)

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useHotkeys('mod+o', () => setIsSidebarOpen(prev => !prev), {
    preventDefault: true
  })

  const value = {
    isSidebarOpen,
    setIsSidebarOpen: (value: boolean) => setIsSidebarOpen(value)
  }

  return (
    <SidebarProviderContext.Provider value={value}>
      {children}
    </SidebarProviderContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarProviderContext)

  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }

  return context
}
