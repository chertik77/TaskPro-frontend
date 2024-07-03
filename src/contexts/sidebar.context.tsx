import type { PropsWithChildren } from 'react'

import { createContext, useContext, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import { useTabletAndBelowMediaQuery } from 'hooks'

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

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  useHotkeys('mod+o', () => setIsSidebarOpen(prev => !prev), {
    preventDefault: true,
    ignoreEventWhen: () => isTabletAndBelow
  })

  return (
    <SidebarProviderContext.Provider
      value={{ isSidebarOpen, setIsSidebarOpen }}>
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
